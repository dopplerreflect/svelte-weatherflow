<script>
	import { rapid_wind, obs_st } from '$lib/store';
	import Header from './Header.svelte';
</script>

<Header lastRapidWind={$rapid_wind[0]} lastObsSt={$obs_st[0]} />

<slot />

<style>
	:global(body) {
		margin: 0;
		color: white;
		background-color: black;
	}
	:global(a) {
		color: white;
	}
	:global(*) {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
	}
</style>
