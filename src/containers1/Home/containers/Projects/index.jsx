import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Switch, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import SiteLoader from 'components/SiteLoader';
import List from './containers/List';
import { makeSelectReady } from './store/selectors';
import { pullProjectData } from './store/actions';
import './index.scss';

const Projects = (props) => {
	const { ready, match } = props;

	useEffect(() => {
		props.pullProjectData();
	}, []);


	if (!ready) return <SiteLoader />; // todo add loader for local route

	return (
		<Switch>
			<Route path={`${match.url}`} component={List} />
		</Switch>
	);
};

const mapStateToProps = createStructuredSelector({
	ready: makeSelectReady(),
});

const mapDispatchToProps = {
	pullProjectData,
};

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(
	withConnect,
)(Projects);
