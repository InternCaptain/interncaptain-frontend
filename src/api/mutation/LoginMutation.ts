import { gql } from '@apollo/client';
import User from '../types/User';

const LoginMutation = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			currentUser {
				id
				role
				firstName
				lastName
				email
				profilePicture
			}
		}
	}
`;

export interface LoginData {
	login: {
		token: string;
		currentUser: User;
	};
}

export interface LoginVars {
	email: string;
	password: string;
}

export default LoginMutation;
