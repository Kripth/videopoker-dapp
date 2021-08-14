const active: Record<number, boolean> = {};

export function isActive(id: number): boolean {
	return active[id];
}

export function setActive(id: number, value: boolean) {
	active[id] = value;
}

export async function ifActive<T>(id: number, promise: Promise<T>): Promise<T> {
	await promise;
	if(!active[id]) {
		throw new Error("Component is no longer active");
	}
	return promise;
}
