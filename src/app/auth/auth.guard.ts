import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import { IAuthState } from './auth.types';
import { IAppState, ROOT_AUTH_SELECTORS } from '../store';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(
		private router: Router,
		private store: Store<IAppState>) { }

	canActivate(): Observable<boolean> {
		return this.store.select(ROOT_AUTH_SELECTORS.currentUser)
			.flatMap(user => {
				if (!user) {
					this.router.navigate(['/login']);
					return Observable.of(false);
				}
				return Observable.of(true);
			});
	}
}
