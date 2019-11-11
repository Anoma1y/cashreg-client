import React, { memo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Email from './containers/Email';
import Confirm from './containers/Confirm';
import NewPassword from './containers/NewPassword';

const Restore = ({ match }) => (
	<Switch>
		<Route exact path={`${match.url}`}>
			<Redirect to={'/auth/restore/email'} />
		</Route>
		<Route path={`${match.url}/email`} component={Email} />
		<Route path={`${match.url}/confirm`} component={Confirm} />
		<Route path={`${match.url}/password`} component={NewPassword} />
	</Switch>
);

export default memo(Restore);
