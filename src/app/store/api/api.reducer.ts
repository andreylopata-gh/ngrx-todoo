import { combineReducers, ActionReducer } from '@ngrx/store';

import { IApiState } from './api.types';
import { generate } from './generic';

// require all entities using glob pattern instead of using hard-coding object.
export const BASE_ENTITIES = {
	lessons: { name: 'somethings', url: 'somethings' },
};

const generic = Object.keys(BASE_ENTITIES).reduce((memo: any, entityKey) => {
	const entity = BASE_ENTITIES[entityKey];
	const name = entity.name;
	const currentGeneric = generate(entity);
	currentGeneric.reducers = currentGeneric.reducer;
	return Object.keys(currentGeneric).reduce((node, key) => {
		if (!node[key]) node[key] = {};
		node[key][name] = currentGeneric[key];
		return node;
	}, memo);
}, {});

export const apiReducer: ActionReducer<IApiState> = combineReducers(generic.reducers);
export const API_ACTION_TYPES = generic.actionTypes;
export const API_INITIAL_STATE = generic.initialState;
export const API_SELECTORS = generic.selectors;
export const API_EFFECTS = generic.effects;
