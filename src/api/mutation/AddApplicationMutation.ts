import { gql } from '@apollo/client';
import Application from '../types/Application';

const AddApplicationMutation = gql`
	mutation($internshipId: Long!, $studentId: Long!) {
		addApplication(internshipId: $internshipId, studentId: $studentId) {
			id
			internship {
				id
			}
			student {
				id
			}
			status
		}
	}
`;

export interface AddApplicationData {
	addApplication: Application;
}

export interface AddApplicationVars {
	internshipId: number;
	studentId: number;
}

export default AddApplicationMutation;
