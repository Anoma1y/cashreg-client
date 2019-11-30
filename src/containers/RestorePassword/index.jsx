import React, { memo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { url } from 'utils/constants';
import Email from './containers/Email';
import Send from './containers/Send';
import NewPassword from './containers/NewPassword';
import Success from './containers/Success';

const RestorePassword = () => (
	<Switch>
		<Redirect exact from={url.auth.restore.index} to={url.auth.restore.email} />
		<Route path={url.auth.restore.email} component={Email} />
		<Route path={url.auth.restore.send} component={Send} />
		<Route path={url.auth.restore.password} component={NewPassword} />
		<Route path={url.auth.restore.success} component={Success} />
	</Switch>
);

export default RestorePassword;
