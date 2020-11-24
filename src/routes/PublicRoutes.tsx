import { Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import Login from '../widgets/Login';
import PublicPage from '../pages/PublicPage';

const PublicRoutes = () => {
	return (
		<PublicPage>
			<Switch>
				<Route path="/login" exact component={Login} />
				<Redirect path="/**" to={'/login'} />
			</Switch>
		</PublicPage>
	);
};

export default PublicRoutes;
