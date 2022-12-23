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
	messageEmitter.emit('weatherflow-message', message);
});

export default function weatherflow(io: Server): void {
	io.on('connection', (socket) => {
		socket.emit('connection', 'websocket connected to server');
		sockets.push(socket);
	});
}
messageEmitter.on('weatherflow-message', (message) => {
	// console.log('messageEmmiter weatherflow-message', message.type);
	sockets.forEach((socket) => {
		socket.emit(message.type, message);
	});
});
