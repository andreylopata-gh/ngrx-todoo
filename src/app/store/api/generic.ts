import { Injectable } from '@angular/core';

import { keyBy, capitalize } from 'lodash';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { createSelector } from 'reselect';

import { StoreService } from '../store.service';
import { API_GENERIC_ENITY_INITITAL_STATE, IApiGenericEntityState } from './api.types';
import { IAction } from '../store.types';
import { smartRecursiveReplacement } from '../../core/helpers/nestedObjects';
import { ApiService } from './api.service';
import { ApiActions } from './api.actions';

export const generate = (baseEntity): any => {
	const name = baseEntity.name;
	const NAME = capitalize(name);
	const actionTypes = {
		LOAD: StoreService.registerType(NAME, 'Load'),
		LOAD_SUCCESS: StoreService.registerType(NAME, 'Load', 'Success'),
		LOAD_FAILED: StoreService.registerType(NAME, 'Load', 'Failed'),
		UPDATE: StoreService.registerType(NAME, 'Update'),
		SELECT: StoreService.registerType(NAME, 'Select'),
		CLEAR: StoreService.registerType(NAME, 'Clear'),
	};

	const initialState = API_GENERIC_ENITY_INITITAL_STATE;
	const reducer = (
		state: IApiGenericEntityState<any> = API_GENERIC_ENITY_INITITAL_STATE,
		action: IAction): IApiGenericEntityState<any> => {
		switch (action.type) {
			case actionTypes.LOAD: {
				return {
					entities: null,
					currentId: null,
					isLoading: true,
				};
			}
			case actionTypes.LOAD_SUCCESS: {
				const rawEntites = action.data;
				const entities = keyBy(rawEntites, 'id');
				return {
					...state,
					entities,
					currentId: entities[state.currentId],
					error: null,
					isLoading: false,
				};
			}
			case actionTypes.LOAD_FAILED: {
				return {
					entities: null,
					currentId: null,
					error: action.data,
					isLoading: false,
				};
			}
			case actionTypes.SELECT: {
				return {
					...state,
					currentId: action.data,
				};
			}
			case actionTypes.UPDATE: {
				const data = action.data;
				const pack = Array.isArray(data) ? data : [data];
				return pack.reduce((newState, current) => {
					const path = current.path;
					const newValue = current.value;
					return smartRecursiveReplacement(newState, path, newValue);
				}, state);
			}
			case actionTypes.CLEAR: {
				return {
					...state,
					currentId: null,
				};
			}
			default:
				return state;
		}
	};
	const selectors = {
		node: state => state[name],
		entities<T>(state) {
			return createSelector(
				selectors.node,
				(apiState: IApiGenericEntityState<T>) => apiState.entities)(state);
		},
		currentId<T>(state) {
			return createSelector(
				selectors.node,
				(apiState: IApiGenericEntityState<T>) => apiState.currentId)(state);
		},
		error<T>(state) {
			return createSelector(
				selectors.node,
				(apiState: IApiGenericEntityState<T>) => apiState.error)(state);
		},
		isLoading<T>(state) {
			return createSelector(
				selectors.node,
				(apiState: IApiGenericEntityState<T>) => apiState.isLoading)(state);
		},
		current<T>(state) {
			return createSelector(
				selectors.entities,
				selectors.currentId,
				(entities: T[], currentId: string) => {
					if (!entities) return;
					return entities[currentId];
				})(state);
		},
	};

	@Injectable()
	class Effects {
		@Effect() load$ = this.actions$
			.ofType(actionTypes.LOAD)
			.switchMap(() => this.apiService.fetch(baseEntity.url, baseEntity.formatter)
				.map(entities => this.apiActions.loadSuccess(name, entities))
				.catch(err => Observable.of(this.apiActions.loadFailed(name, err))));

		constructor(
			private apiService: ApiService,
			private apiActions: ApiActions,
			private actions$: Actions) { }
	}
	const effects = Effects;

	return {
		actionTypes,
		initialState,
		reducer,
		selectors,
		effects,
	};
};
