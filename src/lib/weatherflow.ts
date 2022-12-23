type ObsStInput = [
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number
];

type RapidWindInput = [number, number, number];
type ObInput = [number, number, number];

type WeatherflowInput = {
	serial_number: string;
	type: 'evt_precip' | 'evt_strike' | 'rapid_wind' | 'obs_st';
	hub_sn: string;
	evt: ObInput;
	ob: RapidWindInput;
	obs: ObsStInput[];
};

export type RapidWindObject = {
	type: 'rapid_wind';
	timestamp: number;
	speed: number;
	direction: number;
};

export type ObsStObject = {
	type: 'obs_st';
	timestamp: number;
	windLull: number;
	windAvg: number;
	windGust: number;
	windDirection: number;
	windSampleInterval: number;
	stationPressure: number;
	airTemperature: number;
	relativeHumidity: number;
	illuminance: number;
	uv: number;
	solarRadiation: number;
	rainAmount: number;
	precipitationType: number;
	lightningStrikeAvgDistance: number;
	lightningStrikeCount: number;
	battery: number;
	reportInterval: number;
};

export function weatherflowParser(
	object: WeatherflowInput
): RapidWindObject | ObsStObject | undefined {
	switch (object.type) {
		case 'rapid_wind':
			return rapidWind(object.ob);
		case 'obs_st':
			return obsSt(object.obs[0]);
	}
}

export function rapidWind(value: RapidWindInput): RapidWindObject {
	const [timestamp, speed, direction] = value;
	return { type: 'rapid_wind', timestamp, speed, direction };
}

export function obsSt(value: ObsStInput): ObsStObject {
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
	] = value;

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
