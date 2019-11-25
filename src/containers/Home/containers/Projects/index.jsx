import React from 'react';
import { Switch, Route } from 'react-router-dom';
import List from './containers/List';
import './index.scss';

const Projects = ({ match }) => {
	console.log('update projects')
	return (
		<Switch>
			<Route path={`${match.url}`} component={List} />
		</Switch>
	);
};

export default React.memo(Projects);
