import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Switch, Route } from 'react-router-dom';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
// import SiteLoader from 'components/SiteLoader';
// import List from './containers1/List';
import reducer from './store/reducer';
import saga from './store/saga';
import { makeSelectReady } from './store/selectors';
import { pullContragentData } from './store/actions';
// import './index.scss';

const Categories = props => null;

// const Categorys = (props) => {
// 	const { ready, match } = props;
//
// 	useEffect(() => {
// 		props.pullContragentData();
// 	}, []);
//
// 	if (!ready) return <SiteLoader />; // todo add loader for local route
//
// 	return (
// 		<Switch>
// 			<Route path={`${match.url}`} component={List} />
// 		</Switch>
// 	);
// };
//
// const withReducer = injectReducer({
// 	key: 'projects',
// 	reducer,
// });
//
// const withSaga = injectSaga({
// 	key: 'projects',
// 	saga,
// });

const mapStateToProps = createStructuredSelector({
	ready: makeSelectReady(),
});

const mapDispatchToProps = {
	pullContragentData,
};

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(
	withConnect,
)(Categories);
