import React, { useEffect, } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route, Link } from 'react-router-dom';
import List from './containers/List';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './store/reducer';
import saga from './store/saga';
import { makeSelectReady } from './store/selectors';
import { pullTransactionData } from './store/actions';
import SiteLoader from 'components/SiteLoader';
import './index.scss';

const Transactions = ({ pullTransactionData, ready, match }) => {
	useEffect(() => {
		pullTransactionData();
	}, []);

	if (!ready) return <SiteLoader />; // todo add loader for local route

	return (
		<Switch>
			<Route path={`${match.url}`} component={List} />
		</Switch>
	);
};

const withReducer = injectReducer({
	key: 'transaction',
	reducer,
});

const withSaga = injectSaga({
	key: 'transaction',
	saga,
});

const mapStateToProps = createStructuredSelector({
	ready: makeSelectReady(),
});

const mapDispatchToProps = {
	pullTransactionData,
};

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(
	withReducer,
	withSaga,
	withConnect,
)(Transactions);
