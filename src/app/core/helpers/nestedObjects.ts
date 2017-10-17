import { isDefAndNotNull } from './def';
/*
// IMMUTABLE Replacing given value in given path in object, path can be just single key, or array of keys
export const getRecursiveObjectReplacement = (obj: any, path: string | string[], value: any | (() => any)) => {
	if (!isDefAndNotNull(obj)) return obj;
	if (typeof path === 'string' || path.length === 1) {
		const currentPath = typeof path === 'string' ? path : path[0];
		if (value instanceof Function) {
			const oldValue = obj[currentPath];
			value = value(oldValue);
		}
		return {
			...obj,
			[currentPath]: value,
		};
	}
	const currentPath = path[0];
	if (!Array.isArray(obj)) {
		return {
			...obj,
			[currentPath]: getRecursiveObjectReplacement(obj[currentPath], path.slice(1), value),
		};
	}
	const newArray = obj.slice();
	newArray.splice(+currentPath, 1, getRecursiveObjectReplacement(obj[currentPath], path.slice(1), value));
	return newArray;
};

export const smartRecursiveReplacement = (state, path, newValue) => {
	return getRecursiveObjectReplacement(state, path, value => {
		return typeof newValue === 'object' ? { ...value, ...newValue } : newValue;
	});
};

export const getNestedObjectField = (obj, path: string | string[]) => {
	if (!obj) return undefined;
	if (typeof path === 'string') return obj[path];
	return path.reduce((memo, currentPath) => {
		return memo ? memo[currentPath] : undefined;
	}, obj);
};

export const getCopy = (obj) => {
	if (!isDefAndNotNull(obj)) return obj;
	if (Array.isArray(obj)) return obj.slice();
	if (obj === Object(obj)) return { ...obj };
	return obj;
};
*/
