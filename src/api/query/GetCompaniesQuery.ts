import { gql } from '@apollo/client';
import Company from '../types/Company';
import { Connection } from '../types/Connection';

const GetCompaniesQuery = gql`
	query getCompanies($where: CompanyFilter) {
		companies(where: $where) {
			nodes {
				name
			}
		}
	}
`;

export default GetCompaniesQuery;

export type CompanyConnection = Connection<Company>;

export interface GetCompaniesData {
	companies: CompanyConnection;
}

export interface GetCompaniesVars {
	where: {
		companyId: number;
	};
}
