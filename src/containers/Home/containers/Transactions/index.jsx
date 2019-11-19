import React from 'react';
import { compose } from 'redux';
import { Switch, Route, Link } from 'react-router-dom';
import List from './containers/List';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './store/reducer';
import './index.scss';

const Transactions = ({ match }) => (
	<Switch>
		<Route path={`${match.url}`} component={List} />
	</Switch>
);

const withReducer = injectReducer({
	key: 'transaction',
	reducer,
});

// const withSaga = injectSaga({
// 	key: 'transaction',
// 	saga,
// });

export default compose(
	withReducer,
)(Transactions);
