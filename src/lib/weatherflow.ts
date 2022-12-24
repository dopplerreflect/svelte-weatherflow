import type {
	DecodedObservationEvent,
	DecodedRapidWindEvent,
	ObservationEvent,
	RapidWindEvent
} from './weatherflow.d';

export { DecodedObservationEvent, DecodedRapidWindEvent, ObservationEvent, RapidWindEvent };

export const RAPID_WIND_CACHE_SIZE = 600; // 30 minutes of 3-second intervals
export const OBSERVATION_CACHE_SIZE = 30; // 30 minutes of 1-second intervals

const decodedWeatherflowEventCache = {
	rapid_wind: [decodeRapidWindEvent()],
	obs_st: [decodeObservationEvent()]
};

function cacheDecodedRapidWindEvent(event: DecodedRapidWindEvent): void {
	if (event.timestamp === 0) return;
	decodedWeatherflowEventCache.rapid_wind.length > 0 &&
		(decodedWeatherflowEventCache.rapid_wind = decodedWeatherflowEventCache.rapid_wind.filter(
			(e) => e.timestamp !== 0
		)).sort((a, b) => b.timestamp - a.timestamp);

	decodedWeatherflowEventCache.rapid_wind.length === RAPID_WIND_CACHE_SIZE &&
		decodedWeatherflowEventCache.rapid_wind.pop();

	decodedWeatherflowEventCache.rapid_wind.unshift(event);
}

function cacheDecodedObservationEvent(event: DecodedObservationEvent): void {
	if (event.timestamp === 0) return;
	decodedWeatherflowEventCache.obs_st.length > 0 &&
		(decodedWeatherflowEventCache.obs_st = decodedWeatherflowEventCache.obs_st.filter(
			(e) => e.timestamp !== 0
		)).sort((a, b) => b.timestamp - a.timestamp);

	// convert to array of strings that can be passed into Set() in order to remove
	// duplicates once differing battery values are not a factor
	const arrayOfJSONStrings = decodedWeatherflowEventCache.obs_st
		.map((o) => {
			// differring battery values per timestamp caused apparent dupes. don't need it.
			delete o.battery;
			return o;
		})
		.map((o) => JSON.stringify(o));

	decodedWeatherflowEventCache.obs_st = JSON.parse(`[
		${[...new Set(arrayOfJSONStrings)]}
	]`);

	decodedWeatherflowEventCache.obs_st.length === OBSERVATION_CACHE_SIZE &&
		decodedWeatherflowEventCache.obs_st.pop();

	decodedWeatherflowEventCache.obs_st.unshift(event);
}

export function getRapidWindCache(): DecodedRapidWindEvent[] {
	return decodedWeatherflowEventCache.rapid_wind;
}

export function getObservationCache(): DecodedObservationEvent[] {
	return decodedWeatherflowEventCache.obs_st;
}

export function decodeRapidWindEvent(
	value: RapidWindEvent['ob'] = [0, 0, 0]
): DecodedRapidWindEvent {
	const [timestamp, speed, direction] = value;
	let rapidWindEvent: DecodedRapidWindEvent = {
		type: 'rapid_wind',
		timestamp,
		speed,
		direction
	};
	cacheDecodedRapidWindEvent(rapidWindEvent);
	return rapidWindEvent;
}

export function decodeObservationEvent(
	value: ObservationEvent['obs'] = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
): DecodedObservationEvent {
	const [
		timestamp,
		windLull,
		windAvg,
		windGust,
		windDirection,
		windSampleInterval,
		stationPressure,
		airTemperature,
		relativeHumidity,
		illuminance,
		uv,
		solarRadiation,
		rainAmount,
		precipitationType,
		lightningStrikeAvgDistance,
		lightningStrikeCount,
		battery,
		reportInterval
	] = value[0];

	let obsStEvent: DecodedObservationEvent = {
		type: 'obs_st',
		timestamp,
		windLull,
		windAvg,
		windGust,
		windDirection,
		windSampleInterval,
		stationPressure,
		airTemperature,
		relativeHumidity,
		illuminance,
		uv,
		solarRadiation,
		rainAmount,
		precipitationType,
		lightningStrikeAvgDistance,
		lightningStrikeCount,
		battery,
		reportInterval
	};
	cacheDecodedObservationEvent(obsStEvent);
	return obsStEvent;
}
