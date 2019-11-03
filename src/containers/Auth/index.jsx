import React from 'react';
import {
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Restore from './containers/Restore';
import './index.scss';

const Auth = ({ match }) => (
	<div className={'auth auth-wrapper'}>
		<Switch>
			<Route exact path={`${match.url}`}>
				<Redirect to={'/auth/signin'} />
			</Route>
			<Route path={`${match.url}/signin`} component={Signin} />
			<Route path={`${match.url}/signup`} component={Signup} />
			<Route path={`${match.url}/restore`} component={Restore} />
		</Switch>
	</div>
);

export default Auth;
