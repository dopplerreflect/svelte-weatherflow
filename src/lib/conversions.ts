export function mpsToMph(value: number): number {
	return Number((value * 2.23694).toFixed(1));
}

export function celsiusToFarenheit(value: number): number {
	return Number(((value * 9) / 5 + 32).toFixed(1));
}
