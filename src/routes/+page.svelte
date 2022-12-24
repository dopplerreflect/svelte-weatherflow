<script lang="ts">
	import { io } from 'socket.io-client';
	import { celsiusToFarenheit, mpsToMph } from '$lib/conversions';
	import {
		decodeObservationEvent,
		decodeRapidWindEvent,
		type DecodedObservationEvent,
		type DecodedRapidWindEvent
	} from '$lib/weatherflow';

	let rapid_wind: DecodedRapidWindEvent[] = [decodeRapidWindEvent()];
	let obs_st: DecodedObservationEvent[] = [decodeObservationEvent()];

	const socket = io();

	socket.on('connection', (message: any) => {
		console.log(message);
	});
	socket.on('rapid_wind', (message: DecodedRapidWindEvent[]) => {
		rapid_wind = message;
	});
	socket.on('obs_st', (message: DecodedObservationEvent[]) => {
		obs_st = message;
	});
</script>

<p>Temperature: {celsiusToFarenheit(obs_st[0].airTemperature)}</p>
<ul>
	<li>Lull: {mpsToMph(obs_st[0].windLull)}</li>
	<li>Avg: {mpsToMph(obs_st[0].windAvg)}</li>
	<li>Gust: {mpsToMph(obs_st[0].windGust)}</li>
</ul>

<p>Wind Speed: {mpsToMph(rapid_wind[0].speed)}</p>
<p>Wind Direction: {rapid_wind[0].direction}</p>

<code>{JSON.stringify(rapid_wind, null, 2)}</code>
<code>{JSON.stringify(obs_st, null, 2)}</code>

<style>
	code {
		white-space: pre;
	}
</style>
