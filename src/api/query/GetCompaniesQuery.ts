import { gql } from "@apollo/client";
import Company from "../types/Company";
import { Connection, ConnectionParams } from "../types/Connection";

const GetCompaniesQuery = gql`
    query getCompanies($company: Long) {
        companies(where: { id: $company }) {
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

export interface GetCompaniesVars extends ConnectionParams<Company> {
}