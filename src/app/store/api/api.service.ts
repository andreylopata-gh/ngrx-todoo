import { Injectable, Injector } from '@angular/core';
import { Http } from '@angular/http';

import { API_URL } from '../../core/core.types';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {

	constructor(private http: Http, private injector: Injector) { }

	fetch<T>(name, formatterType?): Observable<T[]> {
		let formatter;
		if(formatterType) {
			formatter = this.getFormatter(formatterType);
		}
		return this.http.get(`${API_URL}/${name}`)
			.map(res => res.json())
			.map(res => res.data)
			.map((entities: T[]) => formatter ? entities.map(formatter.format) : entities);
	}

	getFormatter(type) {
		return this.injector.get(type);
	}

}
