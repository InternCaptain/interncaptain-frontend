import { gql } from '@apollo/client';
import User, { UserForCreate } from '../types/User';

const RegisterMutation = gql`
	mutation register($user: UserForCreateInput) {
		register(input: $user) {
			id
			firstName
			lastName
			email
			profilePicture
		}
	}
`;

export interface RegisterData {
	register: User;
}

export interface RegisterVars {
	user: UserForCreate;
}

export default RegisterMutation;
