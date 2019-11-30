import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { url } from 'utils/constants';

import Confirm from './containers/Confirm';
import Create from './containers/Create';
import Success from './containers/Success';
import Send from './containers/Send';

const Signup = () => (
	<Switch>
		<Redirect exact from={url.auth.signup.index} to={url.auth.signup.create} />
		<Route path={url.auth.signup.create} component={Create} />
		<Route path={url.auth.signup.send} component={Send} />
		<Route path={url.auth.signup.confirm} component={Confirm} />
		<Route path={url.auth.signup.success} component={Success} />
	</Switch>
);

export default Signup;
