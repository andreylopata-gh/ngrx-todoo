import { combineReducers, ActionReducer, compose } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { createSelector } from 'reselect';

import { apiReducer, API_SELECTORS } from './api';
import { authReducer, AUTH_SELECTORS } from '../auth';

import { IAppState, STATE_REPLACE_ACTION } from './store.types';

// Define the global store shape by combining our application's
// reducers together into a given structure.
export const reducers = {
	router: fromRouter.routerReducer,
	api: apiReducer,
	auth: authReducer,
};

// const developmentReducer: ActionReducer<IAppState> = compose(
// 	combineReducers,
// )(reducersMap);
// const productionReducer: ActionReducer<IAppState> = combineReducers(reducersMap);
//
// export const rootReducer = (state: any, action: any) => {
// 	if (action.type === STATE_REPLACE_ACTION) {
// 		return { ...action.data };
// 	}
// 	if (ENV === 'development') {
// 		return developmentReducer(state, action);
// 	} else {
// 		return productionReducer(state, action);
// 	}
// };

const buildSelectors = (selectorGroup, rootSelector) => {
	return Object.keys(selectorGroup).reduce((memo: any, key) => {
		memo[key] = createSelector(rootSelector, selectorGroup[key]);
		return memo;
	}, {});
};

export const ROOT_SELECTORS = {
	api: (state: IAppState) => state.api,
	auth: (state: IAppState) => state.auth,
};

export const ROOT_API_SELECTORS = Object.keys(API_SELECTORS).reduce((memo: any, key) => {
	const selectorsGroup = API_SELECTORS[key];
	memo[key] = buildSelectors(selectorsGroup, ROOT_SELECTORS.api);
	return memo;
}, {});

export const ROOT_AUTH_SELECTORS = buildSelectors(AUTH_SELECTORS, ROOT_SELECTORS.auth);
