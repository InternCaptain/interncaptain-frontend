import { gql } from '@apollo/client';
import User from '../types/User';

const GetCurrentUserQuery = gql`
	query getCurrentUser {
		currentUser {
			id
			firstName
			lastName
			email
			profilePicture
		}
	}
`;

export default GetCurrentUserQuery;

export interface GetCurrentUserData {
	currentUser: User;
}

export interface GetCurrentUserVars {}
