import React, { memo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Transactions from './containers/Transactions';
import Projects from './containers/Projects';
import Workspaces from './containers/Workspaces';

const MainContainer = () => (
	<div className={'main-container'}>
		<Switch>
			<Route exact path={'/'}>
				<Redirect to={'/overview'} />
			</Route>
			<Route path={'/overview'}>
				<h1>Overview</h1>
			</Route>
			<Route path={'/transactions'} component={Transactions} />
			<Route path={'/projects'} component={Projects} />
			<Route path={'/workspaces'} component={Workspaces} />
			<Route path={'/settings'}>
				<h1>Settings</h1>
			</Route>
		</Switch>
	</div>
);

export default memo(MainContainer);
