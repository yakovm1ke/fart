export function isEnumValue<T>(value: unknown, values: T[]): value is T {
	return values.some((it) => it === value)
}
