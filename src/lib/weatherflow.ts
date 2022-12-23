import type {
	DecodedObservationEvent,
	DecodedRapidWindEvent,
	ObservationEvent,
	RapidWindEvent
} from './weatherflow.d';

export { DecodedObservationEvent, DecodedRapidWindEvent, ObservationEvent, RapidWindEvent };

export function decodeRapidWindEvent(
	value: RapidWindEvent['ob'] = [0, 0, 0]
): DecodedRapidWindEvent {
	const [timestamp, speed, direction] = value;
	return { type: 'rapid_wind', timestamp, speed, direction };
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

	return {
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
}
