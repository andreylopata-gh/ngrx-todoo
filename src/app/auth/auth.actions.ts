import { Injectable } from '@angular/core';
import { StoreService } from '../store/store.service';
import { IAction } from '../store/store.types';

export const NAME = 'Auth';

export const ACTION_TYPES = {
	LOGIN: StoreService.registerType(NAME, 'Login'),
	LOGIN_SUCCESS: StoreService.registerType(NAME, 'Login', 'Success'),
	LOGIN_FAILED: StoreService.registerType(NAME, 'Login', 'Failed'),
	LOGOUT: StoreService.registerType(NAME, 'Logout'),
	ME: StoreService.registerType(NAME, 'Me'),
	UPDATE_USER: StoreService.registerType(NAME, 'Update', 'User'),
	SIGNUP_REQUEST: StoreService.registerType(NAME, 'Signup', 'Request'),
	SIGNUP_REQUEST_SUCCESS: StoreService.registerType(NAME, 'Signup', 'Request', 'Success'),
	SIGNUP_REQUEST_FAILED: StoreService.registerType(NAME, 'Signup', 'Request', 'Failed'),
	SIGNUP_VERIFY: StoreService.registerType(NAME, 'Signup', 'Verify'),
	SIGNUP_VERIFY_FAILED: StoreService.registerType(NAME, 'Signup', 'Verify', 'Failed'),
};

@Injectable()
export class AuthActions {
	constructor() { }

	login(username: string, password: string, isShared = false): IAction {
		const data = { username, password };
		return { type: ACTION_TYPES.LOGIN, data, isShared };
	}

	loginSuccess(token: string, user: any, shouldRedirect = true, isShared = false): IAction {
		const data = { token, user, shouldRedirect };
		return { type: ACTION_TYPES.LOGIN_SUCCESS, data, isShared };
	}

	loginFailed(err: any, isShared = false): IAction {
		const data = err;
		return { type: ACTION_TYPES.LOGIN_FAILED, data, isShared };
	}

	updateUser(user: any, isShared = false): IAction {
		const data = user;
		return { type: ACTION_TYPES.UPDATE_USER, data, isShared };
	}

	logout(isShared = false): IAction {
		return { type: ACTION_TYPES.LOGOUT, isShared };
	}

	me(token: string, shouldRedirect = true, isShared = false): IAction {
		const data = token;
		return { type: ACTION_TYPES.ME, data, isShared };
	}

	signupRequest(phone: string, isShared = false): IAction {
		const data = { phone };
		return { type: ACTION_TYPES.SIGNUP_REQUEST, data, isShared };
	}

	signupRequestSuccess(isShared = false): IAction {
		return { type: ACTION_TYPES.SIGNUP_REQUEST_SUCCESS, isShared };
	}

	signupRequestFailed(err: any, isShared = false): IAction {
		const data = err;
		return { type: ACTION_TYPES.SIGNUP_REQUEST_FAILED, data, isShared };
	}

	signupVerify(phone: string, code: string, isShared = false): IAction {
		const data = { phone, code };
		return { type: ACTION_TYPES.SIGNUP_VERIFY, data, isShared };
	}

	signupVerifyFailed(err: any, isShared = false): IAction {
		const data = err;
		return { type: ACTION_TYPES.SIGNUP_VERIFY_FAILED, data, isShared };
	}
}
