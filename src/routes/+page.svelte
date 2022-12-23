<script lang="ts">
	import { io } from 'socket.io-client';
	import { celsiusToFarenheit, mpsToMph } from '$lib/conversions';
	import {
		decodeObservationEvent,
		decodeRapidWindEvent,
		type DecodedObservationEvent,
		type DecodedRapidWindEvent
	} from '$lib/weatherflow';

	let rapid_wind: DecodedRapidWindEvent | undefined;
	let obs_st: DecodedObservationEvent | undefined;

	const socket = io();

	socket.on('connection', (message: any) => {
		console.log(message);
	});

	socket.on('weatherflow-message', (message: any) => {
		if (message.type === 'rapid_wind') rapid_wind = decodeRapidWindEvent(message.ob);
		if (message.type === 'obs_st') obs_st = decodeObservationEvent(message.obs);
	});

	// $: {
	// 	console.log(rapid_wind);
	// }
	// $: {
	// 	console.log(obs_st);
	// }
</script>

<code>{JSON.stringify(rapid_wind, null, 2)}</code>
<code>{JSON.stringify(obs_st, null, 2)}</code>

{#if obs_st?.airTemperature}
	<p>Temperature: {celsiusToFarenheit(obs_st.airTemperature)}</p>
	<ul>
		<li>Lull: {mpsToMph(obs_st.windLull)}</li>
		<li>Avg: {mpsToMph(obs_st.windAvg)}</li>
		<li>Gust: {mpsToMph(obs_st.windGust)}</li>
	</ul>
{/if}

{#if rapid_wind?.speed}
	<p>Wind Speed: {mpsToMph(rapid_wind.speed)}</p>
{/if}

<style>
	code {
		white-space: pre;
	}
</style>
