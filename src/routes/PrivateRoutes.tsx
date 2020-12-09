import { Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import StudentElement from '../widgets/StudentElement';
import UserWidget from '../widgets/UserWidget';
import ThemePicker from '../widgets/ThemePicker';

interface PrivateRoutesProperties {}

const PrivateRoutes: React.FC<PrivateRoutesProperties> = (properties) => {
	return (
		<>
			<ThemePicker />
			<Switch>
				<Route path="/StudentElement" exact component={StudentElement} />
				<Route path="/UserWidget" exact component={UserWidget} />
				<Route path="/ThemePicker" exact component={ThemePicker} />
				<Redirect path="/**" to={'/UserWidget'} />
			</Switch>
		</>
	);
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoutes);
