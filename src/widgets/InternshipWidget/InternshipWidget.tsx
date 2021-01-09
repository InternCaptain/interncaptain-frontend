import React from 'react';
import { UserRole } from '../../api/types/UserRole';
import { Internship } from '../../api/types/Internship';
import Application from '../../api/types/Application';
import InternshipStudentWidget from './InternshipStudentWidget';
import InternshipRecruiterWidget from './InternshipRecruiterWidget';

export interface InternshipWidgetProperties {
	internship: Internship;
	applications: Application[];
	role: UserRole;
	onExtend: () => void;
}

const InternshipWidget: React.FC<InternshipWidgetProperties> = (props) => {

	const { internship, role, applications, onExtend } = props;

	if (role === UserRole.STUDENT) {
		return (
			<InternshipStudentWidget
				internship={internship}
				onExtend={onExtend} />
		);
	} else {
		return (
			<InternshipRecruiterWidget
				internship={internship}
				applications={applications}
				onExtend={onExtend}
			/>
		);
	}
};

export default InternshipWidget;
