import React from 'react';
import { Switch, Route } from 'react-router-dom';
import List from './containers/List';
import Single from './containers/Single';
import { url } from 'utils/constants';

const Project = () => (
	<Switch>
		<Route exact path={url.home.project.index} component={List} />
		<Route path={url.home.project.single} component={Single} />
	</Switch>
)

export default Project;
