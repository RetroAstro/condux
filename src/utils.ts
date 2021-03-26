const isObject = (value: any) => {
	return typeof value === 'object' && value !== null
}

export function equalFn(a: any, b: any) {
	if (a === b) {
		return a !== 0 || b !== 0 || 1 / a === 1 / b
	} else {
		return a !== a && b !== b
	}
}

export function shallowEqualFn(a: any, b: any) {
	if (equalFn(a, b)) {
		return true
	}

	if (!isObject(a) || !isObject(b)) {
		return false
	}

	const keys_a = Object.keys(a)
	const keys_b = Object.keys(b)

	if (keys_a.length !== keys_b.length) {
		return false
	}

	for (let i = 0; i < keys_a.length; i++) {
		if (
			!Object.prototype.hasOwnProperty.call(b, keys_a[i]) ||
			!equalFn(a[keys_a[i]], b[keys_a[i]])
		) {
			return false
		}
	}

	return true
}
