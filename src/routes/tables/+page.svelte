<script lang="ts">
	import { obs_st, rapid_wind } from '$lib/store';
	import { celsiusToFarenheit, mpsToMph } from '$lib/conversions';
	import { hueForSpeed } from '$lib/color';
</script>

<main>
	<div>
		<table cellspacing="0">
			<caption>Entries: {$rapid_wind.length}</caption>
			<thead>
				<th>Time</th>
				<th>Speed</th>
				<th>Direction</th>
			</thead>
			<tbody>
				{#each $rapid_wind as rapid_wind, i}
					<tr>
						<td
							>{new Date(rapid_wind.timestamp * 1000).toLocaleString('en-US', {
								timeStyle: 'medium'
							})}</td
						>
						<td style={`color:hsla(${hueForSpeed(mpsToMph(rapid_wind.speed))}, 100%, 50%`}
							>{mpsToMph(rapid_wind.speed)}</td
						>
						<td>{rapid_wind.direction}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div>
		<table cellspacing="0">
			<caption>Entries: {$obs_st.length}</caption>
			<thead>
				<th>Time</th>
				<th>Temp</th>
				<th>Humidity</th>
				<th>Lull</th>
				<th>Avg</th>
				<th>Gust</th>
			</thead>
			<tbody>
				{#each $obs_st as obs_st}
					<tr>
						<td
							>{new Date(obs_st.timestamp * 1000).toLocaleString('en-US', {
								timeStyle: 'medium'
							})}</td
						>
						<td>{celsiusToFarenheit(obs_st.airTemperature)}</td>
						<td>{obs_st.relativeHumidity}</td>
						<td style={`color:hsla(${hueForSpeed(mpsToMph(obs_st.windLull))}, 100%, 50%`}
							>{mpsToMph(obs_st.windLull)}</td
						>
						<td style={`color:hsla(${hueForSpeed(mpsToMph(obs_st.windAvg))}, 100%, 50%`}
							>{mpsToMph(obs_st.windAvg)}</td
						>
						<td style={`color:hsla(${hueForSpeed(mpsToMph(obs_st.windGust))}, 100%, 50%`}
							>{mpsToMph(obs_st.windGust)}</td
						>
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
	tr:nth-child(even) {
		background-color: hsla(0, 0%, 15%);
	}
	td {
		text-align: center;
	}
</style>
