import { gql } from '@apollo/client';
import { Connection, ConnectionParams } from '../types/Connection';
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

export default GetInternShipsQuery;

export type InternshipConnection = Connection<Internship>;

export interface GetInternShipsData {
	internships: InternshipConnection;
}

export interface GetInternShipsVars extends ConnectionParams<Internship> {}
