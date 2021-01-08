import { ApplicationStatus } from './ApplicationStatus';

export default interface Application {
	id: number;
	internshipId: number;
	studentId: number;
	status: ApplicationStatus;
}
