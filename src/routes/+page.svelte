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
	let lastRapidWind: DecodedRapidWindEvent;
	let lastObsSt: DecodedObservationEvent;
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

	$: lastObsSt = obs_st[0];
	$: lastRapidWind = rapid_wind[0];
</script>

<header>
	<div>Temp: {celsiusToFarenheit(lastObsSt.airTemperature)}</div>
	<div>Wind Speed: {mpsToMph(lastRapidWind.speed)}</div>
	<div>Direction: {lastRapidWind.direction}</div>
	<div>Lull: {mpsToMph(lastObsSt.windLull)}</div>
	<div>Avg: {mpsToMph(lastObsSt.windAvg)}</div>
	<div>Gust: {mpsToMph(lastObsSt.windGust)}</div>
</header>

<main>
	<div>
		<!-- <code>{JSON.stringify(rapid_wind, null, 2)}</code> -->
		<table>
			{#each rapid_wind as rw}
				<tr>
					<td>{rw.timestamp}</td>
					<td>{mpsToMph(rw.speed)}</td>
					<td>{rw.direction}</td>
				</tr>
			{/each}
		</table>
	</div>
	<div>
		<!-- <code>{JSON.stringify(obs_st, null, 2)}</code> -->
		<table>
			<thead>
				<th>Timestamp</th>
				<th>Temp</th>
				<th>Lull</th>
				<th>Avg</th>
				<th>Gust</th>
			</thead>
			{#each obs_st as os}
				<tr>
					<td>{os.timestamp}</td>
					<td>{celsiusToFarenheit(os.airTemperature)}</td>
					<td>{mpsToMph(os.windLull)}</td>
					<td>{mpsToMph(os.windAvg)}</td>
					<td>{mpsToMph(os.windGust)}</td>
				</tr>
			{/each}
		</table>
	</div>
</main>

<style>
	code {
		white-space: pre;
	}
	header {
		height: 1em;
		display: grid;
		grid-template-columns: repeat(6, 1fr);
	}
	header div {
		display: flex;
		justify-content: center;
	}
	main {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}
	main div {
		height: calc(100vh - 1em);
		max-height: calc(100vh - 1em);
		overflow: scroll;
	}
	table {
		width: 100%;
	}
	td {
		/* display: flex; */
		/* flex-direction: column; */
		text-align: center;
	}
</style>
