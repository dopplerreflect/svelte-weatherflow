import type {
	DecodedObservationEvent,
	DecodedRapidWindEvent,
	ObservationEvent,
	RapidWindEvent
} from './weatherflow.d';

export { DecodedObservationEvent, DecodedRapidWindEvent, ObservationEvent, RapidWindEvent };

const RAPID_WIND_CACHE_SIZE = 3;
const OBSERVATION_CACHE_SIZE = 3;

let rapidWindCache: DecodedRapidWindEvent[] = [];
let observationCache: DecodedObservationEvent[] = [];

function cacheDecodedRapidWindEvent(event: DecodedRapidWindEvent): void {
	if (event.timestamp === 0) return;
	rapidWindCache.length === RAPID_WIND_CACHE_SIZE && rapidWindCache.shift();
	rapidWindCache.push(event);
}

function cacheDecodedObservationEvent(event: DecodedObservationEvent): void {
	if (event.timestamp === 0) return;
	observationCache.length === OBSERVATION_CACHE_SIZE && observationCache.shift();
	observationCache.push(event);
}

export function getRapidWindCache(): DecodedRapidWindEvent[] {
	return rapidWindCache;
}

export function getObservationCache(): DecodedObservationEvent[] {
	return observationCache;
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
