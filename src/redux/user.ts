import { User } from '../api/types/User';
import { Action } from 'redux';
import GetUsersQuery, { GetUsersData, GetUsersVars } from '../api/query/GetUsersQuery';
import { SortOperationKind } from '../api/types/Connection';
import client from '../api/client';
import LoginMutation, { LoginData, LoginVars } from '../api/mutation/LoginMutation';
import ServerError from '../api/types/ServerError';
import GetCurrentUserQuery, { GetCurrentUserData, GetCurrentUserVars } from '../api/query/GetCurrentUserQuery';

const SET_USERS = 'SET_USERS';
const SET_TOKEN = 'SET_TOKEN';
const SET_ERROR = 'SET_ERROR';
const SET_CURRENT_USER = 'SET_CURRENT_USER';

export interface UserState {
	users: User[];
	token: string;
	error?: ServerError;
	currentUser?: User;
}

export interface UserAction extends Action {
	users?: User[];
	token?: string;
	error?: ServerError;
	user?: User;
}

const initialUserState = {
	users: [],
	token: localStorage.getItem('token') || ''
};

export const setUsers = (users: User[]) => ({ type: SET_USERS, users });
export const setToken = (token: string) => ({ type: SET_TOKEN, token });
export const setLoginError = (error: ServerError) => ({ type: SET_ERROR, error });
export const setCurrentUser = (user: User) => ({ type: SET_CURRENT_USER, user });

export const fetchUsers = () => {
	return (dispatch: any) => {
		return client
			.query<GetUsersData, GetUsersVars>({
				query: GetUsersQuery,
				variables: {
					order_by: {
						firstName: SortOperationKind.ASC
					}
				}
			})
			.then((response) => {
				const { data } = response;
				if (data) {
					dispatch(setUsers(data.users.nodes!!));
				}
			});
	};
};

export const login = (credentials: LoginVars) => {
	return (dispatch: any) => {
		return client
			.mutate<LoginData, LoginVars>({
				mutation: LoginMutation,
				variables: {
					...credentials
				}
			})
			.then((response) => {
				const { data } = response;
				if (data) {
					dispatch(setCurrentUser(data.login.currentUser))
					dispatch(setToken(data.login.token));
				}
			})
			.catch((error) => {
				const firstError = error.graphQLErrors[0];
				dispatch(
					setLoginError({
						cause: `${firstError.path!![0]}`,
						message: firstError.message
					})
				);
			});
	};
};

export const fetchCurrentUser = () => {
	return (dispatch: any) => {
		return client
			.query<GetCurrentUserData, GetCurrentUserVars>({
				query: GetCurrentUserQuery
			})
			.then((response) => {
				const { data } = response;
				if (data) {
					dispatch(setCurrentUser(data.currentUser));
				}
			}).catch(console.log);
	};
};

const userReducer = (state: UserState = initialUserState, action: UserAction) => {
	const { type, users, token, error, user } = action;
	switch (type) {
		case SET_USERS:
			return {
				...state,
				users
			};
		case SET_TOKEN:
			localStorage.setItem("token", token!!);
			return {
				...state,
				token
			};
		case SET_ERROR:
			return {
				...state,
				error
			};
		case SET_CURRENT_USER:
			return {
				...state,
				currentUser: user
			}
		default:
			return state;
	}
};

export default userReducer;
