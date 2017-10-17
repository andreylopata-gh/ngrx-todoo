import { Injectable } from '@angular/core';

import { IAction } from '../store.types';
import { API_ACTION_TYPES } from './api.reducer';

@Injectable()
export class ApiActions {

	constructor() { }

	load(name: string, isShared = false): IAction {
		return { type: API_ACTION_TYPES[name].LOAD, isShared };
	}

	loadSuccess<T>(name: string, entities: T[], isShared = false): IAction {
		const data = entities;
		return { type: API_ACTION_TYPES[name].LOAD_SUCCESS, data, isShared };
	}

	loadFailed(name: string, err: any, isShared = false): IAction {
		const data = err;
		return { type: API_ACTION_TYPES[name].LOAD_FAILED, data, isShared };
	}

	update(name: string, data: any | any[], isShared = true): IAction {
		return { type: API_ACTION_TYPES[name].UPDATE, data, isShared };
	}

	select(name: string, id: string, isShared = false): IAction {
		const data = id;
		return { type: API_ACTION_TYPES[name].SELECT, data, isShared };
	}

	clear(name: string, isShared = false): IAction {
		return { type: API_ACTION_TYPES[name].CLEAR, isShared };
	}
}
