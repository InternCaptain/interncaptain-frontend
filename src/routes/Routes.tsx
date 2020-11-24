import history from './history';
import { Router } from 'react-router-dom';
import React from 'react';
import PrivateRoutes from './PrivateRoutes';
import { connect } from 'react-redux';
import PublicRoutes from './PublicRoutes';

interface RoutesProperties {
	isAuthenticated: boolean;
}

const Routes: React.FC<RoutesProperties> = (properties) => {
	const { isAuthenticated } = properties;
	return (
		<>
			<Router history={history}>{isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />}</Router>
		</>
	);
};

const mapStateToProps = (state: any) => ({
	isAuthenticated: false
});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
