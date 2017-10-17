import { Injectable } from '@angular/core';

@Injectable()
export class StoreService {

	static registerType(type: string, ...strings: string[]): string {
		const base = `@app/${type.toLowerCase()}`;
		const stringsToLower = strings.map(s => s.toLowerCase());
		const remaining = stringsToLower.length > 0 ? `/${stringsToLower.join('/')}` : '';
		const full = `${base}${remaining}`;
		if (this[full]) {
			throw new Error(`Action type "${full}" is not unique"`);
		}

		this[full] = true;
		return full;
	}

	private static typeCache: { [label: string]: boolean } = {};

	constructor() { }

}
