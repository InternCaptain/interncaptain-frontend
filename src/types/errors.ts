export default interface Error<T> {
	cause: T;
	message?: string;
}

type LoginErrorCause = 'email' | 'password' | 'server';

export interface LoginError extends Error<LoginErrorCause> {}
