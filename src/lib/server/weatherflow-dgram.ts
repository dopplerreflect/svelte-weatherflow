import {
	decodeObservationEvent,
	decodeRapidWindEvent,
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
	// console.log('dgramSocket got message', message.type);

	// TODO: put stuff in fixed-length arrays and emit the arrays instead

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

export default function weatherflow(io: Server): void {
	io.on('connection', (socket) => {
		socket.emit('connection', 'websocket connected to server');
		sockets.push(socket);
	});
}

messageEmitter.on('weatherflow-message', (message) => {
	console.log('messageEmmiter weatherflow-message', message.type);
	sockets.forEach((socket) => {
		socket.emit(message.type, message);
	});
});
