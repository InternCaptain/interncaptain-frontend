import { gql } from '@apollo/client';
import Profile from '../types/Profile';

const GetProfilesQuery = gql`
	query getProfile($userId: Long!) {
		profiles(where: { userId: $userId }) {
			description
			sections {
				name
				position
				fields {
					name
					kind
				}
				entries {
					position
					data {
						name
						value
					}
				}
			}
		}
	}
`;

export default GetProfilesQuery;

export interface GetProfilesData {
	profiles: Profile[];
}

export interface GetProfilesVars {
	userId: number;
}
