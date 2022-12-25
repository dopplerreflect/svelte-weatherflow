<script lang="ts">
	import { page } from '$app/stores';
	import { celsiusToFarenheit, mpsToMph } from '$lib/conversions';
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
		grid-template-columns: repeat(7, 1fr);
	}
	header div {
		display: flex;
		justify-content: center;
	}
</style>
