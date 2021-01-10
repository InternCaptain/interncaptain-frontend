import React, { useEffect } from 'react';
import InternshipWidget from './InternshipWidget';
import { UserRole } from '../api/types/UserRole';
import AppState from '../redux/AppState';
import { fetchAddApplication, fetchApplications, fetchInternships, updateApplicationStatus } from '../redux/internship';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import User from '../api/types/User';
import { Internship } from '../api/types/Internship';
import Application from '../api/types/Application';
import { ApplicationStatus } from '../api/types/ApplicationStatus';
import InternshipList from './InternshipList';

const InternshipPage = (props) => {

	return (
		<>
		<InternshipList/>
		</>
	);
};



export default InternshipPage;
