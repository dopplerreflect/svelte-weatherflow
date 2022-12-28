import { writable } from 'svelte/store';
import { io } from 'socket.io-client';
import {
	decodeObservationEvent,
	decodeRapidWindEvent,
	type DecodedObservationEvent,
	type DecodedRapidWindEvent
} from '$lib/weatherflow';

export const rapid_wind = writable([decodeRapidWindEvent()]);

export const obs_st = writable([decodeObservationEvent()]);

const socket = io();

socket.on('connection', (message: string) => console.log(message));

socket.on('rapid_wind', (message: DecodedRapidWindEvent[]) => {
	rapid_wind.set(message);
});

socket.on('obs_st', (message: DecodedObservationEvent[]) => {
	obs_st.set(message);
});

export const rapidWindReportLimit = writable(30);
