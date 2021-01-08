import { gql } from "@apollo/client";
import Application from "../types/Application";
import { Connection, ConnectionParams } from "../types/Connection";

const GetApplicationsQuery = gql`
    query getApplications($internship: Long!) {
        applications(where:{internshipId: $internship}) {
            nodes {
                studentId
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

export interface GetApplicationsVars extends ConnectionParams<Application> {
}