export function xyCoordinates(angle: number, radius: number, maxRadius: number) {
	if (maxRadius === 0) return { x: 0, y: 0 };
	const coords = {
		x: (100 / maxRadius) * radius * Math.cos((angle - 90) * (Math.PI / 180)),
		y: (100 / maxRadius) * radius * Math.sin((angle - 90) * (Math.PI / 180))
	};
	return coords;
}

export function xyCoordinatesString(angle: number, speed: number, maxSpeed: number) {
	return `${xyCoordinates(angle, speed, maxSpeed).x},${xyCoordinates(angle, speed, maxSpeed).y}`;
}
