import { gql } from '@apollo/client';
import Application from '../types/Application';
import { Connection } from '../types/Connection';

const GetApplicationsQuery = gql`
	query getApplications($where: ApplicationFilter) {
		applications(where: $where) {
			nodes {
				internship {
					id
				}
				student {
					firstName
					lastName
					profilePicture
				}
				status
			}
		}
	}
`;

export default GetApplicationsQuery;

export type ApplicationConnection = Connection<Application>;

export interface GetApplicationsData {
	applications: ApplicationConnection;
}

export interface GetApplicationsVars {
	where?: {
		internshipId?: number;
		studentId?: number;
	};
}
