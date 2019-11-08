import React, {
  createContext,
  useEffect,
} from 'react';
import { Switch, Route, Redirect, } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import WithAuth from 'components/WithAuth';
import { animated } from 'react-spring';
import Sidebar, { useSidebar } from './components/Sidebar';
import Header from './components/Header';
import SiteLoader from 'components/SiteLoader';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import saga from './store/saga';
import { pullHomeData } from './store/actions';
import { makeSelectReady } from './store/selectors';
import reducer from './store/reducer';
import './index.scss';

export const Context = createContext({});

const Home = ({ pullHomeData, ready, location }) => {
  const sidebarState = useSidebar();

  useEffect(() => {
    pullHomeData();
  }, []);

  if (!ready) return <SiteLoader />;

  return (
    <Context.Provider value={sidebarState}>
      <Sidebar />

      <animated.main
        style={sidebarState.mainStyle}
        className={'main h-full'}
      >
        <Header location={location} />

        <Switch>
          <Route exact path={'/'}>
            <Redirect to={'/overview'}/>
          </Route>
          <Route path={'/overview'}>
            <h1>Overview</h1>
          </Route>
          <Route path={'/transactions'}>
            <h1>Transactions</h1>
          </Route>
          <Route path={'/workspaces'}>
            <h1>Workspaces</h1>
          </Route>
        </Switch>
      </animated.main>
    </Context.Provider>
  )
};

const withReducer = injectReducer({
  key: 'home',
  reducer
});

const withSaga = injectSaga({
  key: 'home',
  saga
});

const mapStateToProps = createStructuredSelector({
  ready: makeSelectReady(),
});

const mapDispatchToProps = {
  pullHomeData,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default WithAuth(compose(
  withReducer,
  withSaga,
  withConnect
)(Home));
