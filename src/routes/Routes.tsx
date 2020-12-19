import browserHistory from './browserHistory';
import { Router } from 'react-router-dom';
import React, { useEffect } from 'react';
import PrivateRoutes from './PrivateRoutes';
import { connect } from 'react-redux';
import PublicRoutes from './PublicRoutes';
import AppState from '../redux/AppState';
import User from '../api/types/User';
import { fetchCurrentUser } from '../redux/user';
import LoadingWidget from '../widgets/LoadingWidget';

interface RoutesProperties {
	currentUser?: User;
	token?: string;
	getCurrentUser: () => void;
}

const Routes: React.FC<RoutesProperties> = (properties) => {
	const { currentUser, token, getCurrentUser } = properties;

	useEffect(() => {
		if (token && currentUser === undefined) {
			getCurrentUser();
		}
	}, [currentUser, token, getCurrentUser]);

	switch (true) {
		case token !== undefined && token !== '' && currentUser === undefined:
			return <LoadingWidget />;
		case token !== undefined && token !== '' && currentUser !== undefined:
			return (
				<Router history={browserHistory}>
					<PrivateRoutes />
				</Router>
			);
		default:
			return (
				<Router history={browserHistory}>
					<PublicRoutes />
				</Router>
			);
	}
};

const mapStateToProps = (state: AppState) => ({
	currentUser: state.userState.currentUser,
	token: state.userState.token
});

const mapDispatchToProps = (dispatch: any) => ({
	getCurrentUser: () => dispatch(fetchCurrentUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
