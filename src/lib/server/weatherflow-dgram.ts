import {
	decodeObservationEvent,
	decodeRapidWindEvent,
	getObservationCache,
	getRapidWindCache,
	type DecodedObservationEvent,
	type DecodedRapidWindEvent
} from '$lib/weatherflow';
import dgram from 'node:dgram';
import { EventEmitter } from 'node:events';
import type { Server, Socket } from 'socket.io';

const sockets: Socket[] = [];

class MessageEmitter extends EventEmitter {}

const messageEmitter = new MessageEmitter();

const dgramSocket = dgram.createSocket({ type: 'udp4', reuseAddr: true });

dgramSocket.bind(50222);

dgramSocket.addListener('message', (buffer) => {
	const message = JSON.parse(buffer.toString());

	let decodedMessage: DecodedRapidWindEvent | DecodedObservationEvent | null;
	switch (message.type) {
		case 'rapid_wind':
			decodedMessage = decodeRapidWindEvent(message.ob);
			break;
		case 'obs_st':
			decodedMessage = decodeObservationEvent(message.obs);
			break;
		default:
			decodedMessage = null;
	}
	decodedMessage && messageEmitter.emit('weatherflow-message', decodedMessage);
});

messageEmitter.on('weatherflow-message', (message) => {
	let messageCache: DecodedRapidWindEvent[] | DecodedObservationEvent[] | null = [];
	switch (message.type) {
		case 'rapid_wind':
			messageCache = getRapidWindCache();
			break;
		case 'obs_st':
			messageCache = getObservationCache();
			break;
		default:
			messageCache = null;
	}
	emitMessageToSockets(message.type, messageCache);
});

function emitMessageToSockets(messageType: string, message: any): void {
	sockets.forEach((socket) => socket.emit(messageType, message));
}

export default function weatherflow(io: Server): void {
	io.on('connection', (socket) => {
		console.log('client connected');
		socket.emit('connection', 'websocket connected to server');
		sockets.push(socket);
		emitMessageToSockets('rapid_wind', getRapidWindCache());
		emitMessageToSockets('obs_st', getObservationCache());
	});
}
