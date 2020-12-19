import { Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import Login from '../widgets/Login';
import PublicPage from '../widgets/PublicPage';
import Register from '../widgets/Register';

const PublicRoutes = () => {
	return (
		<PublicPage>
			<Switch>
				<Route path="/register" exact component={Register} />
				<Route path="/login" exact component={Login} />
				<Redirect path="/**" to={'/login'} />
			</Switch>
		</PublicPage>
	);
};

export default PublicRoutes;
