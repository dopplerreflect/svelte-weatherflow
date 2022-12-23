import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { Server } from 'socket.io';
import type { Server as HttpServer } from 'http';

/** @type {import('vite').UserConfig} */
const config: UserConfig = {
	plugins: [
		sveltekit(),
		{
			name: 'weatherflow',
			configureServer(server) {
				import('./dist/weatherflow-dgram.js').then(({ default: weatherflow }) => {
					weatherflow(new Server(server.httpServer as HttpServer));
				});
				// const io = new Server(server.httpServer as HttpServer);
				// io.on('connection', (socket) => {
				// 	socket.emit('foo', 'bar');
				// });
			}
		}
	]
};

export default config;
