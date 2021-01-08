import { ApplicationStatus } from './ApplicationStatus';
import { Internship } from './Internship';
import User from './User';

export default interface Application {
	id: number;
	internship: Internship;
	student: User;
	status: ApplicationStatus;
}
