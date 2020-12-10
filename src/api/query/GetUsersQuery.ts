import { gql } from '@apollo/client';
import { User } from '../types/User';
import { Connection, ConnectionParams } from '../types/Connection';

const GetUsersQuery = gql`
	query getUsers($order_by: UserSort) {
		users(order_by: $order_by) {
			nodes {
				id
				firstName
				lastName
				email
				profilePicture
			}
		}
	}
`;

export default GetUsersQuery;

export type UserConnection = Connection<User>;

export interface GetUsersData {
	users: UserConnection;
}

export interface GetUsersVars extends ConnectionParams<User> {}
