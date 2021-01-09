import React from 'react';
import { UserRole } from '../../api/types/UserRole';
import { Internship } from '../../api/types/Internship';
import Application from '../../api/types/Application';
import InternshipStudentWidget from './InternshipStudentWidget';
import InternshipRecruiterWidget from './InternshipRecruiterWidget';
import { ApplicationStatus } from '../../api/types/ApplicationStatus';

export interface InternshipWidgetProperties {
	internship: Internship;
	applications: Application[];
	role: UserRole;
	onExtend: () => void;
	onSetApplicationStatus: (applicationId: number, newStatus: ApplicationStatus) => void;
}

const InternshipWidget: React.FC<InternshipWidgetProperties> = (props) => {

	const { internship, role, applications, onExtend, onSetApplicationStatus } = props;

	if (role === UserRole.STUDENT) {
		return (
			<InternshipStudentWidget
				internship={internship}
				onExtend={onExtend} />
		);
	} else {
		return <InternshipRecruiterWidget
			internship={internship}
			applications={applications}
			onExtend={onExtend}
			onSetApplicationStatus={onSetApplicationStatus}
			/>
	}
};

export default InternshipWidget;
