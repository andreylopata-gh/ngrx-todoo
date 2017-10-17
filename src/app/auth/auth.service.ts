import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { IAppState, ROOT_AUTH_SELECTORS } from '../store';
import { API_URL } from '../core/core.types';
import { AuthActions } from './auth.actions';
import { AuthFormatter } from './auth.formatter';

@Injectable()
export class AuthService {

	private readonly CURRENT_USER = 'currentUser';

	constructor(
		private http: Http,
		private authActions: AuthActions,
		private authFormatter: AuthFormatter,
		private store: Store<IAppState>) {
	}

	login(username: string, password: string): Observable<any> {
		return this.http.post(`${API_URL}/auth/login`, { login: username, password })
			.map(res => res.json())
			.map(res => this.authFormatter.format(res.data));
	}

	me(token: string): Observable<any> {
		const headers = new Headers();
		headers.append('Authorization', `Bearer ${token}`);
		const options = { headers };

		return this.http.get(`${API_URL}/auth/me`, options)
			.map(res => res.json())
			.map(res => this.authFormatter.format(res.data));
	}

	logout() {
		return Observable.of(null);
	}

	signupRequest(phone: string) {
		const data = { login: phone };
		return this.http.post(`${API_URL}/user/create`, data)
			.map(res => res.json());
	}

	signupVerify(phone: string, code: string) {
		const data = { login: phone, password: code };
		return this.http.post(`${API_URL}/user/verify`, data)
			.map(res => res.json())
			.map(res => res.data);
	}

	getCurrentUser() {
		return this.store.select(ROOT_AUTH_SELECTORS.currentUser);
	}
}
