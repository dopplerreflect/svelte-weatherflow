<script lang="ts">
	import { weatherflowParser } from '$lib/weatherflow-parser';
  import type { WeatherflowData } from '$lib/weatherflow-parser';

  import { io } from 'socket.io-client'

  let rapid_wind: WeatherflowData = { type: 'null' };
  let obs_st = {};

  const socket = io();

  socket.on('join', (message: any) => {
    console.log(message)
  })

  socket.on('weatherflow-message', (message: any) => {
    // if(message.type === 'rapid_wind') (rapid_wind = message.ob);
    // if(message.type === 'obs_st') (obs_st = message.obs);
    let parsedMessage = weatherflowParser(message);
    if(parsedMessage.type === 'rapid_wind') (rapid_wind = parsedMessage)
    if(parsedMessage.type === 'obs_st') (obs_st = parsedMessage)
  })


  $: { console.log(rapid_wind) }
  $: { console.log(obs_st) }
</script>

<code>{JSON.stringify(rapid_wind, null, 2)}</code>
<code>{JSON.stringify(obs_st, null, 2)}</code>

<style>
  code {
    white-space: pre;
  }
</style>