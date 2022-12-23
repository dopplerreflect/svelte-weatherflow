<script lang="ts">
	import { io } from 'socket.io-client';
	import { celsiusToFarenheit, mpsToMph } from '$lib/conversions';
	import {
		decodeObservationEvent,
		decodeRapidWindEvent,
		type DecodedObservationEvent,
		type DecodedRapidWindEvent
	} from '$lib/weatherflow';

	let rapid_wind: DecodedRapidWindEvent = decodeRapidWindEvent();
	let obs_st: DecodedObservationEvent = decodeObservationEvent();

	const socket = io();

	socket.on('connection', (message: any) => {
		console.log(message);
	});

	socket.on('weatherflow-message', (message: any) => {
		if (message.type === 'rapid_wind') rapid_wind = decodeRapidWindEvent(message.ob);
		if (message.type === 'obs_st') obs_st = decodeObservationEvent(message.obs);
	});
</script>

<code>{JSON.stringify(rapid_wind, null, 2)}</code>
<code>{JSON.stringify(obs_st, null, 2)}</code>

<p>Temperature: {celsiusToFarenheit(obs_st.airTemperature)}</p>
<ul>
	<li>Lull: {mpsToMph(obs_st.windLull)}</li>
	<li>Avg: {mpsToMph(obs_st.windAvg)}</li>
	<li>Gust: {mpsToMph(obs_st.windGust)}</li>
</ul>

<p>Wind Speed: {mpsToMph(rapid_wind.speed)}</p>

<style>
	code {
		white-space: pre;
	}
</style>
