export enum WFType {
	Evt_Precip = 'evt_precip',
	Evt_Strike = 'evt_strike',
	Rapid_Wind = 'rapid_wind',
	Obs_St = 'obs_st',
	Hub_Status = 'hub_status',
	Device_Status = 'device_status'
}

interface WeatherflowEvent {
	type:
		| WFType.Evt_Precip
		| WFType.Evt_Strike
		| WFType.Rapid_Wind
		| WFType.Obs_St
		| WFType.Hub_Status
		| WFType.Device_Status;
	serial_number: string;
	hub_sn: string;
}

export interface RainStartEvent extends WeatherflowEvent {
	type: WFType.Evt_Precip;
	evt: [
		number // timestamp
	];
}

export interface LightningStrikeEvent extends WeatherflowEvent {
	type: WFType.Evt_Strike;
	evt: [
		number, // timestamp
		number, // distance
		number // energy
	];
}

export interface RapidWindEvent extends WeatherflowEvent {
	type: WFType.Rapid_Wind;
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
	type: WFType.Obs_St;
	obs: ObservationObs[];
}

export interface DeviceStatusEvent extends WeatherflowEvent {
	type: WFType.Device_Status;
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
	type: WFType.Hub_Status;
	serial_number: string;
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
	type: WFType.Rapid_Wind;
	timestamp: number;
	speed: number;
	direction: number;
};

export type DecodedObservationEvent = {
	type: WFType.Obs_St;
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
	battery?: number; // removing due to it causing dupe in observations
	reportInterval: number;
};
