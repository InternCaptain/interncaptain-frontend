import { gql } from '@apollo/client';
import { Connection } from '../types/Connection';
import { Internship } from '../types/Internship';

const GetInternShipsQuery = gql`
	query getInternships($where: InternshipFilter) {
		internships(where: $where) {
			nodes {
				id
				company {
					name
				}
				description
				domain
				positionName
				recruiter {
					firstName
					lastName
					profilePicture
				}
			}
		}
	}
`;

export default GetInternShipsQuery;

export type InternshipConnection = Connection<Internship>;

export interface GetInternShipsData {
	internships: InternshipConnection;
}

export interface GetInternShipsVars {
	where?: {
		recruiterId?: number;
	};
}
