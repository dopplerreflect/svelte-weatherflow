<script lang="ts">
	import { page } from '$app/stores';
	import { celsiusToFarenheit, mpsToMph } from '$lib/conversions';
	import { rapidWindReportLimit } from '$lib/store';
	import type { DecodedObservationEvent, DecodedRapidWindEvent } from '$lib/weatherflow';
	export let lastRapidWind: DecodedRapidWindEvent;
	export let lastObsSt: DecodedObservationEvent;
</script>

<header>
	<div>Wind Speed: {mpsToMph(lastRapidWind.speed)}</div>
	<div>Direction: {lastRapidWind.direction}</div>
	<div>Temp: {celsiusToFarenheit(lastObsSt.airTemperature)}</div>
	<div>Lull: {mpsToMph(lastObsSt.windLull)}</div>
	<div>Avg: {mpsToMph(lastObsSt.windAvg)}</div>
	<div>Gust: {mpsToMph(lastObsSt.windGust)}</div>
	<div>
		<select bind:value={$rapidWindReportLimit}>
			<option>1</option>
			<option>5</option>
			<option>10</option>
			<option>15</option>
			<option>20</option>
			<option>25</option>
			<option>30</option>
		</select>
	</div>
	<div>
		{#if $page.url.pathname === '/'}
			<a href="/tables">tables</a>
		{:else}
			<a href="/">home</a>
		{/if}
	</div>
</header>

<style>
	header {
		height: 1em;
		display: grid;
		grid-template-columns: repeat(8, 1fr);
	}
	header div {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		background-color: hsl(240, 100%, 10%);
	}
	input[type='number'] {
		width: 3em;
	}
</style>
