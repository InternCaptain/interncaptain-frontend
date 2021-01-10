import React, {useEffect} from 'react';
import InternshipWidget from './InternshipWidget';
import {UserRole} from '../api/types/UserRole';
import AppState from '../redux/AppState';
import {
    fetchAddApplication,
    fetchApplications,
    fetchInternships,
    updateApplicationStatus,
    updateInternshipQuery
} from '../redux/internship';
import {connect} from 'react-redux';
import {Box} from '@material-ui/core';
import User from '../api/types/User';
import {Internship} from '../api/types/Internship';
import Application from '../api/types/Application';
import {ApplicationStatus} from '../api/types/ApplicationStatus';
import LoadingWidget from './LoadingWidget';

interface InternshipListProperties {
    currentUser: User;
    internships: Internship[];
    applications: Application[];
    onRequestInternships: (recruiterId?: number) => void;
    onRequestApplications: (where) => void;
    onSetApplicationStatus: (applicationId: number, newStatus: ApplicationStatus) => void;
    onAddApplication: (internshipId: number, studentId: number) => void;
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

const InternshipList: React.FC<InternshipListProperties> = (props) => {
    const {
        internships,
        onRequestInternships,
        onRequestApplications,
        onSetApplicationStatus,
        onAddApplication,
        currentUser,
        applications
    } = props;

    const {role, id} = currentUser;

    useEffect(() => {
        onRequestInternships(role === UserRole.HR ? id : undefined);
    }, [id]);

    const handleGetApplications = (internshipId: number)  => {
        if (role === UserRole.HR) {
            onRequestApplications({internshipId});
        } else {
            onRequestApplications({internshipId, studentId: id});
        }
    }

    const filterApplications = (internshipId: number) => applications.filter((a) => a.internship.id === internshipId);

    const addApplication = (internshipId) => {
        onAddApplication(internshipId, id);
    };

    return internships.length === 0 ? (
        <LoadingWidget/>
    ) : (
        <>
            <Box>
                {splitBy4(internships).map((list, index) => (
                    <Box key={`internships-row-${index}`} style={{display: 'flex', justifyContent: 'center'}}>
                        {list.map((internship) => (
                            <InternshipWidget
                                key={`internship-${internship.id}`}
                                onExtend={() => {
                                    handleGetApplications(internship.id)
                                }}
                                onSetApplicationStatus={(applicationId, newStatus) => {
                                    onSetApplicationStatus(applicationId, newStatus);
                                }}
                                onAddApplication={addApplication}
                                applications={filterApplications(internship.id)}
                                internship={internship}
                                currentUser={currentUser}
                            />
                        ))}
                    </Box>
                ))}
            </Box>
        </>
    );
};

const mapStateToProps = (state: AppState) => ({
    currentUser: state.userState.currentUser,
    internships: state.internshipState.internships,
    applications: state.internshipState.applications
});

const mapDispatchToProps = (dispatch: any) => ({
	onRequestInternships: (recruiterId) => {
		dispatch(updateInternshipQuery('recruiterId', recruiterId));
		dispatch(fetchInternships());
	},
	onRequestApplications: (where) => dispatch(fetchApplications(where)),
	onSetApplicationStatus: (applicationId: number, newStatus: ApplicationStatus) => dispatch(updateApplicationStatus(applicationId, newStatus)),
	onAddApplication: (internshipId: number, studentId: number) => dispatch(fetchAddApplication(internshipId, studentId))
});

export default connect(mapStateToProps, mapDispatchToProps)(InternshipList);
