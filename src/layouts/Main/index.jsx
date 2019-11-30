import React, { createContext, useState, useEffect } from 'react';
// import { createStructuredSelector } from 'reselect';
// import { connect } from 'react-redux';
// import WithAuth from 'components/WithAuth';
import { animated } from 'react-spring';
// import SiteLoader from 'components/SiteLoader';
// import PropTypes from 'prop-types';
import Sidebar, { useSidebar } from './components/Sidebar';
import Header from './components/Header';
// import { pullHomeData } from './store/actions';
// import { pullCategoryData } from './containers/Categories/store/actions';
// import { pullProjectData } from './containers/Projects/store/actions';
// import { pullContragentData } from './containers/Contragents/store/actions';
// import { makeSelectReady } from './store/selectors';
// import MainContainer from './main';
// import { makeSelectReady as makeSelectReadyProjects } from './containers/Projects/store/selectors';
// import { makeSelectReady as makeSelectReadyCategories } from './containers/Categories/store/selectors';
// import { makeSelectReady as makeSelectReadyContragents } from './containers/Contragents/store/selectors';

// import CreateTransaction from './components/CreateTransaction';
import './index.scss';

export const Context = createContext({});

const useMain = () => {
	const [transactionIsOpen, setTransactionIsOpen] = useState(false);

	return {
		transactionIsOpen,
		setTransactionIsOpen,
	};
};

const Home = ({ children }) => {
	console.log('mainlaylout update')
	// const { ready, location, readyProjects, readyCategories, readyContragents } = props;

	const sidebarState = useSidebar();
	const mainState = useMain();

	useEffect(() => {
		// props.pullHomeData();
		// props.pullCategoryData();
		// props.pullProjectData();
		// props.pullContragentData();
	}, []);

	// if (!ready || !readyProjects || !readyCategories || !readyContragents) return <SiteLoader />;

	return (
		<Context.Provider value={{ ...sidebarState, ...mainState }}>
			<Sidebar />

			<animated.main style={sidebarState.mainStyle} className={'main h-full'}>
				{/*<Header location={props.location} />*/}
				<Header />
				{children}
				{/*<MainContainer />*/}
			</animated.main>

			{/*<CreateTransaction />*/}
		</Context.Provider>
	);
};

// Home.propTypes = {
// 	location: PropTypes.any.isRequired,
// 	ready: PropTypes.bool.isRequired,
// 	readyProjects: PropTypes.bool.isRequired,
// 	readyCategories: PropTypes.bool.isRequired,
// 	readyContragents: PropTypes.bool.isRequired,
// 	pullHomeData: PropTypes.func.isRequired,
// 	pullCategoryData: PropTypes.func.isRequired,
// 	pullProjectData: PropTypes.func.isRequired,
// 	pullContragentData: PropTypes.func.isRequired,
// };

// const mapStateToProps = createStructuredSelector({
// 	ready: makeSelectReady(),
// 	readyProjects: makeSelectReadyProjects(),
// 	readyCategories: makeSelectReadyCategories(),
// 	readyContragents: makeSelectReadyContragents(),
// });
//
// const mapDispatchToProps = {
// 	pullHomeData,
// 	pullCategoryData,
// 	pullProjectData,
// 	pullContragentData,
// };

export default Home;
