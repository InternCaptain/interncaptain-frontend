import React from 'react';
import { UserRole } from '../../api/types/UserRole';
import { Internship } from '../../api/types/Internship';
import Application from '../../api/types/Application';
import InternshipStudentWidget from './InternshipStudentWidget';
import InternshipRecruiterWidget from './InternshipRecruiterWidget';
import { ApplicationStatus } from '../../api/types/ApplicationStatus';
import User from "../../api/types/User";

export interface InternshipWidgetProperties {
	internship: Internship;
	applications: Application[];
	currentUser: User;
	onExtend: () => void;
	onSetApplicationStatus: (applicationId: number, newStatus: ApplicationStatus) => void;
	onAddApplication: (internshipId: number) => void;
}

const InternshipWidget: React.FC<InternshipWidgetProperties> = (props) => {
	const { internship, currentUser: {role, id}, applications, onExtend, onSetApplicationStatus, onAddApplication } = props;

	if (role === UserRole.STUDENT) {
		return (
			<InternshipStudentWidget
				internship={internship}
				application={applications.find(app => app.internship.id === internship.id && app.student.id === id)}
				onExtend={onExtend}
				onAddApplication={onAddApplication}
			/>
		);
	} else {
		return (
			<InternshipRecruiterWidget
				internship={internship}
				applications={applications}
				onExtend={onExtend}
				onSetApplicationStatus={onSetApplicationStatus}
			/>
		);
	}
};

export default InternshipWidget;
