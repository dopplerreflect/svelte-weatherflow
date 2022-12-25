<script lang="ts">
	import { obs_st, rapid_wind } from '$lib/store';
	import { celsiusToFarenheit, mpsToMph } from '$lib/conversions';
</script>

<main>
	<div>
		<table>
			<caption>Entries: {$rapid_wind.length}</caption>
			<thead>
				<th>Time</th>
				<th>Speed</th>
				<th>Direction</th>
			</thead>
			<tbody>
				{#each $rapid_wind as rw}
					<tr>
						<td>{new Date(rw.timestamp * 1000).toLocaleString('en-US', { timeStyle: 'medium' })}</td
						>
						<td>{mpsToMph(rw.speed)}</td>
						<td>{rw.direction}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div>
		<table>
			<caption>Entries: {$obs_st.length}</caption>
			<thead>
				<th>Timestamp</th>
				<th>Temp</th>
				<th>Lull</th>
				<th>Avg</th>
				<th>Gust</th>
			</thead>
			<tbody>
				{#each $obs_st as os}
					<tr>
						<td>{new Date(os.timestamp * 1000).toLocaleString('en-US', { timeStyle: 'medium' })}</td
						>
						<td>{celsiusToFarenheit(os.airTemperature)}</td>
						<td>{mpsToMph(os.windLull)}</td>
						<td>{mpsToMph(os.windAvg)}</td>
						<td>{mpsToMph(os.windGust)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</main>

<style>
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
		text-align: center;
	}
</style>
