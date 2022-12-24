<script lang="ts">
	import { io } from 'socket.io-client';
	import { celsiusToFarenheit, mpsToMph } from '$lib/conversions';
	import {
		decodeObservationEvent,
		decodeRapidWindEvent,
		getObservationCache,
		getRapidWindCache,
		type DecodedObservationEvent,
		type DecodedRapidWindEvent,
		type ObservationEvent,
		type RapidWindEvent
	} from '$lib/weatherflow';

	let rapid_wind: DecodedRapidWindEvent = decodeRapidWindEvent();
	let obs_st: DecodedObservationEvent = decodeObservationEvent();
	// let rapidWindCache = getRapidWindCache();
	// let observationCache = getObservationCache();

	const socket = io();

	socket.on('connection', (message: any) => {
		console.log(message);
	});
	socket.on('rapid_wind', (message: DecodedRapidWindEvent) => {
		// rapid_wind = decodeRapidWindEvent(message.ob);
		rapid_wind = message;
		// rapidWindCache = getRapidWindCache();
	});
	socket.on('obs_st', (message: DecodedObservationEvent) => {
		// obs_st = decodeObservationEvent(message.obs);
		obs_st = message;
		// observationCache = getObservationCache();
	});
</script>

<p>Temperature: {celsiusToFarenheit(obs_st.airTemperature)}</p>
<ul>
	<li>Lull: {mpsToMph(obs_st.windLull)}</li>
	<li>Avg: {mpsToMph(obs_st.windAvg)}</li>
	<li>Gust: {mpsToMph(obs_st.windGust)}</li>
</ul>

<p>Wind Speed: {mpsToMph(rapid_wind.speed)}</p>
<p>Wind Direction: {rapid_wind.direction}</p>

<style>
	/* code {
		white-space: pre;
	} */
</style>
