import * as fromRouter from '@ngrx/router-store';

import { AUTH_INITIAL_STATE, IAuthState } from '../auth/auth.types';
import { IApiState } from './api/api.types';
import { API_INITIAL_STATE } from './api/api.reducer';

export interface IAppState {
	router?: fromRouter.RouterReducerState;
	api?: IApiState;
	auth?: IAuthState;
}

export const ROUTER_INITIAL_STATE = null;

export const APP_INITIAL_STATE: IAppState = {
	router: ROUTER_INITIAL_STATE,
	api: API_INITIAL_STATE,
	auth: AUTH_INITIAL_STATE,
};

export interface IAction {
	type: string;
	data?: any;
	path?: string | string[];
	isShared?: boolean;
}

export const STATE_REPLACE_ACTION = 'STATE_REPLACE_ACTION';
