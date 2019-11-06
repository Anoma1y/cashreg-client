import React, {
	memo,
} from 'react';
import {
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import Create from './containers/Create';
import Send from './containers/Send';
import Confirm from './containers/Confirm';
import Success from './containers/Success';

const Signup = ({ match }) => (
	<Switch>
		<Route exact path={`${match.url}`}>
			<Redirect to={'/auth/signup/create'} />
		</Route>
		<Route path={`${match.url}/create`} component={Create} />
		<Route path={`${match.url}/send`} component={Send} />
		<Route path={`${match.url}/confirm`} component={Confirm} />
		<Route path={`${match.url}/success`} component={Success} />
	</Switch>
);

export default Signup;
