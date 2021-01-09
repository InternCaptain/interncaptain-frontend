import { gql } from '@apollo/client';
import Application from '../types/Application';
import { ApplicationStatus } from '../types/ApplicationStatus';

const UpdateApplicationStatusMutation = gql`
    mutation($applicationId: Long!, $newStatus: ApplicationStatus!) {
        updateApplicationStatus(applicationId: $applicationId, newStatus: $newStatus) {
            status
        }
    }
`;

export interface UpdateApplicationStatusData {
    updateApplicationStatus: Application;
}

export interface UpdateApplicationStatusVars {
	applicationId: number;
	newStatus: ApplicationStatus;
}

export default UpdateApplicationStatusMutation;