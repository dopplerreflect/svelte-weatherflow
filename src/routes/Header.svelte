<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { celsiusToFarenheit, mpsToMph } from '$lib/conversions';
	import { rapidWindReportLimit, windroseRotateDegrees } from '$lib/store';
	import type { DecodedObservationEvent, DecodedRapidWindEvent } from '$lib/weatherflow';
	export let lastRapidWind: DecodedRapidWindEvent;
	export let lastObsSt: DecodedObservationEvent;

	$: {
		if (browser) {
			localStorage.setItem('windroseRotateDegreesValue', JSON.stringify($windroseRotateDegrees));
		}
	}
</script>

<header>
	<div>Wind Speed: {mpsToMph(lastRapidWind.speed)}</div>
	<div>Direction: {lastRapidWind.direction}</div>
	<div>Temp: {celsiusToFarenheit(lastObsSt.airTemperature)}</div>
	<!-- <div>Lull: {mpsToMph(lastObsSt.windLull)}</div>
	<div>Avg: {mpsToMph(lastObsSt.windAvg)}</div>
	<div>Gust: {mpsToMph(lastObsSt.windGust)}</div> -->
	<div>
		{$windroseRotateDegrees}<input
			type="range"
			min={0}
			max={359}
			step={1}
			bind:value={$windroseRotateDegrees}
		/>
	</div>
	<div>
		<select bind:value={$rapidWindReportLimit}>
			{#each [1, ...[...Array(6).keys()].map((k) => (k + 1) * 5)] as v}
				<option value={v}>{v}</option>
			{/each}
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
		grid-template-columns: repeat(6, 1fr);
	}
	header div {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		background-color: hsl(240, 100%, 10%);
	}
	select {
		width: 4em;
	}
</style>
