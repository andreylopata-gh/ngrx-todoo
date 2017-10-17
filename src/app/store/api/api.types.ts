export interface IApiState {
	[key: string]: any;
}

export interface IApiGenericEntityState<T> {
	entities: T[];
	currentId: string;
	error?: any;
	isLoading?: boolean;
}

export const API_GENERIC_ENITY_INITITAL_STATE: IApiGenericEntityState<any> = {
	entities: [],
	currentId: null,
	error: null,
	isLoading: false,
};
