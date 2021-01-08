import { Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import ThemePicker from '../widgets/ThemePicker';
import Users from '../widgets/Users';
import PrivatePage from '../widgets/PrivatePage';
import CVForm from '../widgets/CVForm';

interface PrivateRoutesProperties {}

const PrivateRoutes: React.FC<PrivateRoutesProperties> = (properties) => {
	return (
		<PrivatePage>
			<Switch>
				<Route path="/CVForm" exact component={CVForm} />
				<Route path="/Users" exact component={Users} />
				<Route path="/ThemePicker" exact component={ThemePicker} />
				<Redirect path="/**" to={'/CVForm'} />
			</Switch>
		</PrivatePage>
	);
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoutes);
