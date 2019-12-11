import React, { createContext, useState, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Cookie from 'utils/cookie';
// import WithAuth from 'components/WithAuth';
import { animated } from 'react-spring';
import SiteLoader from 'components/SiteLoader';
import { pullCategoryData } from 'containers/Category/store/actions';
import { pullProjectData } from 'containers/Project/store/actions';
import { pullContragentData } from 'containers/Contragent/store/actions';
import PropTypes from 'prop-types';
import Sidebar, { useSidebar } from './components/Sidebar';
import Header from './components/Header';
import { pullHomeData, setReady } from './store/actions';
import { makeSelectReady } from './store/selectors';

import CreateTransaction from './components/CreateTransaction';
import './index.scss';

export const Context = createContext({});

const useMain = () => {
	const [transactionIsOpen, setTransactionIsOpen] = useState(false);

	return {
		transactionIsOpen,
		setTransactionIsOpen,
	};
};

const Home = props => {
	const { ready, children } = props;

	const sidebarState = useSidebar();
	const mainState = useMain();

	useEffect(() => {
		Cookie.set('init_page', window.location.pathname.replace(/\//g, ''));

		props.pullHomeData()
			.then(() => Promise.all([
				props.pullCategoryData({ isInit: true }),
				props.pullProjectData({ isInit: true }),
				props.pullContragentData({ isInit: true }),
			]))
			.then(() => props.setReady(true));

		return () => {
			props.setReady(false); // todo чистить стейт полностью после логаута
		};
	}, []);

	if (!ready) return <SiteLoader />;

	return (
		<Context.Provider value={{ ...sidebarState, ...mainState }}>
			<Sidebar />

			<animated.main style={sidebarState.mainStyle} className={'main h-full'}>
				<Header />
				{children}
			</animated.main>

			<CreateTransaction />
		</Context.Provider>
	);
};

Home.propTypes = {
	ready: PropTypes.bool.isRequired,
	pullHomeData: PropTypes.func.isRequired,
	pullCategoryData: PropTypes.func.isRequired,
	pullProjectData: PropTypes.func.isRequired,
	pullContragentData: PropTypes.func.isRequired,
	setReady: PropTypes.func.isRequired,
	children: PropTypes.node,
};

const mapStateToProps = createStructuredSelector({
	ready: makeSelectReady(),
});

const mapDispatchToProps = {
	pullHomeData,
	pullCategoryData,
	pullProjectData,
	pullContragentData,
	setReady,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
