import React, { PureComponent, Fragment } from 'react';
import {
	Switch,
	Route,
	Link,
} from 'react-router-dom';
import Create from './Create';

class Transactions extends PureComponent {
	render() {
		return (
			<main>
				<ul style={{ marginBottom: 40, }}>
					<li><Link to={'/transactions/create'}>Create</Link></li>
				</ul>
				<Switch>
					<Route exact path={'/transactions/create'} component={Create} />
				</Switch>
			</main>
		)
	}
}

export default Transactions;
