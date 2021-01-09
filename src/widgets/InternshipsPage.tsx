import React, { useEffect } from 'react';
import InternshipWidget from './InternshipWidget';
import { UserRole } from '../api/types/UserRole';
import AppState from '../redux/AppState';
import { fetchApplications, fetchInternships, updateApplicationStatus } from '../redux/internship';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import User from '../api/types/User';
import { Internship } from '../api/types/Internship';
import Application from '../api/types/Application';
import { ApplicationStatus } from '../api/types/ApplicationStatus';

interface InternshipPageProperties {
	currentUser: User;
	internships: Internship[];
	applications: Application[];
	onRequestInternships: (recruiterId: number) => void;
	onRequestApplications: (internshipId: number) => void;
	onSetApplicationStatus: (applicationId: number, newStatus: ApplicationStatus) => void;
}

const split = (count: number) => (items: any[]) => {
	const groups = [];
	for (let i = 0; i < items.length; i++) {
		if (i % count === 0) {
			groups.push([]);
		}
		groups[Math.floor(i / count)].push(items[i]);
	}
	return groups;
};

const splitBy4 = split(4);

const InternshipPage: React.FC<InternshipPageProperties> = (props) => {
	const {
		internships,
		onRequestInternships,
		onRequestApplications,
		onSetApplicationStatus,
		currentUser: { role, id },
		applications
	} = props;

	useEffect(() => {
		onRequestInternships(role === UserRole.HR ? id : null);
	}, []);

	const filterApplications = (internshipId: number) => applications.filter(a => a.internship.id === internshipId);

	return (
		<Box>
			{splitBy4(internships).map((list, index) => (
				<Box key={`internships-row-${index}`} style={{ display: 'flex', justifyContent: 'center' }}>
					{list.map((internship) => (
						<InternshipWidget
							key={`internship-${internship.id}`}
							onExtend={() => {
								onRequestApplications(internship.id);
							}}
							onSetApplicationStatus={(applicationId, newStatus) => {
								onSetApplicationStatus(applicationId, newStatus);
							}}
							applications={filterApplications(internship.id)}
							internship={internship}
							role={role}
						/>
					))}
				</Box>
			))}
		</Box>
	);
};

const mapStateToProps = (state: AppState) => ({
	currentUser: state.userState.currentUser,
	internships: state.internshipState.internships,
	applications: state.internshipState.applications
});

const mapDispatchToProps = (dispatch: any) => ({
	onRequestInternships: (recruiterId) => dispatch(fetchInternships(recruiterId)),
	onRequestApplications: (internshipId: number) => dispatch(fetchApplications({ internshipId })),
	onSetApplicationStatus: (applicationId: number, newStatus: ApplicationStatus) => dispatch(updateApplicationStatus(applicationId, newStatus))
});

export default connect(mapStateToProps, mapDispatchToProps)(InternshipPage);
