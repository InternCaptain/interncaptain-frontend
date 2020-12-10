import { Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import ThemePicker from '../widgets/ThemePicker';
import Users from '../widgets/Users';

interface PrivateRoutesProperties {}

const PrivateRoutes: React.FC<PrivateRoutesProperties> = (properties) => {
	return (
		<>
			<Switch>
				<Route path="/Users" exact component={Users} />
				<Route path="/ThemePicker" exact component={ThemePicker} />
				<Redirect path="/**" to={'/Users'} />
			</Switch>
		</>
	);
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoutes);
