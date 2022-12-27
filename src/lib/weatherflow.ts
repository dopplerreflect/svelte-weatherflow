import {
	WFType,
	type DecodedObservationEvent,
	type DecodedRapidWindEvent,
	type ObservationEvent,
	type RapidWindEvent
} from './weatherflow.d';

export { DecodedObservationEvent, DecodedRapidWindEvent };

export const RAPID_WIND_CACHE_SIZE = 600; // 30 minutes of 3-second intervals
export const OBSERVATION_CACHE_SIZE = 30; // 30 minutes of 1-second intervals

const decodedWeatherflowEventCache = {
	rapid_wind: [decodeRapidWindEvent()],
	obs_st: [decodeObservationEvent()]
};

export function cacheDecodedRapidWindEvent(event: DecodedRapidWindEvent): void {
	if (event.timestamp === 0) return;
	decodedWeatherflowEventCache.rapid_wind.length > 0 &&
		(decodedWeatherflowEventCache.rapid_wind = decodedWeatherflowEventCache.rapid_wind.filter(
			(e) => e.timestamp !== 0
		)).sort((a, b) => b.timestamp - a.timestamp);

	decodedWeatherflowEventCache.rapid_wind.length === RAPID_WIND_CACHE_SIZE &&
		decodedWeatherflowEventCache.rapid_wind.pop();

	decodedWeatherflowEventCache.rapid_wind.unshift(event);
}

export function cacheDecodedObservationEvent(event: DecodedObservationEvent): void {
	if (event.timestamp === 0) return;
	const eventMap = new Map();
	decodedWeatherflowEventCache.obs_st.forEach((e) => eventMap.set(e.timestamp, e));
	decodedWeatherflowEventCache.obs_st = [...eventMap.values()];

	decodedWeatherflowEventCache.obs_st.length > 0 &&
		(decodedWeatherflowEventCache.obs_st = decodedWeatherflowEventCache.obs_st.filter(
			(e) => e.timestamp !== 0
		)).sort((a, b) => b.timestamp - a.timestamp);

	decodedWeatherflowEventCache.obs_st.length === OBSERVATION_CACHE_SIZE &&
		decodedWeatherflowEventCache.obs_st.pop();

	decodedWeatherflowEventCache.obs_st.unshift(event);
}

export function getRapidWindCache() {
	return decodedWeatherflowEventCache.rapid_wind;
}

export function getObservationCache() {
	return decodedWeatherflowEventCache.obs_st;
}

export function decodeRapidWindEvent(
	value: RapidWindEvent['ob'] = [0, 0, 0]
): DecodedRapidWindEvent {
	const [timestamp, speed, direction] = value;
	let rapidWindEvent: DecodedRapidWindEvent = {
		type: WFType.Rapid_Wind,
		timestamp,
		speed,
		direction
	};
	return rapidWindEvent;
}

export function decodeObservationEvent(
	value: ObservationEvent['obs'] = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
) {
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
		type: WFType.Obs_St,
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
	return obsStEvent;
}
