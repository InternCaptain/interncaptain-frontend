import history from './history';
import { Router } from 'react-router-dom';
import React, { useEffect } from 'react';
import PrivateRoutes from './PrivateRoutes';
import { connect } from 'react-redux';
import PublicRoutes from './PublicRoutes';
import AppState from '../redux/AppState';
import { User } from '../api/types/User';
import { fetchCurrentUser } from '../redux/user';
import { LinearProgress } from '@material-ui/core';

interface RoutesProperties {
	currentUser?: User;
	isTokenPresent?: boolean;
	getCurrentUser: () => void;
}

const Routes: React.FC<RoutesProperties> = (properties) => {

	const { currentUser, isTokenPresent, getCurrentUser } = properties;

	useEffect(() => {
		if (isTokenPresent && currentUser === undefined) {
			getCurrentUser();
		}
	}, [currentUser, isTokenPresent, getCurrentUser]);

	if (isTokenPresent) {
		if (currentUser === undefined) {
			return <LinearProgress />;
		} else {
			return <Router history={history}><PrivateRoutes /></Router>;

		}
	} else {
		return <Router history={history}><PublicRoutes /></Router>;
	}
};

const mapStateToProps = (state: AppState) => ({
	currentUser: state.userState.currentUser,
	isTokenPresent: state.userState.token !== ''
});

const mapDispatchToProps = (dispatch: any) => ({
	getCurrentUser: () => dispatch(fetchCurrentUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
