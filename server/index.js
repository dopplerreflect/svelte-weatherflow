import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { handler } from '../build/handler.js';
import weatherflow from '../dist/weatherflow-dgram.js';

const port = 3000;
const app = express();
const server = createServer(app);

weatherflow(new Server(server));

app.use(handler);

server.listen(port);
