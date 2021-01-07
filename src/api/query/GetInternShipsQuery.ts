import { gql } from '@apollo/client';
import { Connection } from '../types/Connection';
import { Internship } from '../types/Internship';

const GetInternShipsQuery = gql`
	query getInternships($recruiter: Long) {
		internships(where: { recruiterId: $recruiter }) {
			nodes {
				companyId
				description
				domain
				id
				positionName
			}
		}
	}
`;

export type InternshipConnection = Connection<Internship>;

export interface GetInternShipsVars {
	recruiter?: number;
}

export default GetInternShipsQuery;