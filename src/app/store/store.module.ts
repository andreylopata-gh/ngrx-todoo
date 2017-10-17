import { NgModule } from '@angular/core';

import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule as RxStoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { APP_INITIAL_STATE } from './store.types';
import { reducers } from './store.reducer';

import { StoreService } from './store.service';
import { API_EFFECTS, ApiService, ApiActions } from './api';

const effectTypes = Object.keys(API_EFFECTS).reduce((memo, key) => {
	memo.push(API_EFFECTS[key]);
	return memo;
}, []);

@NgModule({
	imports: [
		RxStoreModule.forRoot(reducers, { initialState: APP_INITIAL_STATE }),
		StoreRouterConnectingModule,
		EffectsModule.forRoot([
			...effectTypes,
		]),
		// TODO add environment conditional
		StoreDevtoolsModule.instrument({
			maxAge: 20,
		}),
	],
	providers: [StoreService, ApiService, ApiActions],
	declarations: [],
})
export class StoreModule {
	constructor() {}
}
