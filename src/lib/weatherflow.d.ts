interface WeatherflowEvent {
	serial_number: string;
	hub_sn: string;
}

export interface RainStartEvent extends WeatherflowEvent {
	type: 'evt_precip';
	evt: [
		number // timestamp
	];
}

export interface LightningStrikeEvent extends WeatherflowEvent {
	type: 'evt_strike';
	evt: [
		number, // timestamp
		number, // distance
		number // energy
	];
}

export interface RapidWindEvent extends WeatherflowEvent {
	type: 'rapid_wind';
	ob: [
		number, // timestamp
		number, // windSpeed
		number // windDirection
	];
}

type ObservationObs = [
	number, // timestamp
	number, // windLull
	number, // windAvg
	number, // windGust
	number, // windDirection
	number, // windSampleInterval
	number, // stationPressure
	number, // airTemperature
	number, // relativeHumidity
	number, // illuminance
	number, // uv
	number, // solarRadiation
	number, // rainAmount
	number, // precipitationType
	number, // lightningStrikeAvgDistance
	number, // lightningStrikeCount
	number, // battery
	number // reportInterval
];

export interface ObservationEvent extends WeatherflowEvent {
	type: 'obs_st';
	obs: ObservationObs[];
}

export interface DeviceStatusEvent extends WeatherflowEvent {
	type: 'device_status';
	timestamp: number;
	uptime: number;
	voltage: number;
	firmware_revision: number;
	rssi: number;
	hub_rssi: number;
	sensor_status: number;
	debug: number;
}

export interface HubStatusEvent {
	serial_number: string;
	type: 'hub_status';
	firmware_revision: string;
	uptime: number;
	rssi: number;
	timestamp: number;
	reset_flags: string;
	seq: number;
	fs: [number, number, number];
	radio_stats: [number, number, number, number, number];
	mqtt_stats: [number, number];
}

export type DecodedRapidWindEvent = {
	type: 'rapid_wind';
	timestamp: number;
	speed: number;
	direction: number;
};

export type DecodedObservationEvent = {
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
