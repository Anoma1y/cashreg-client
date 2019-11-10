import React, {
  createContext,
  useState,
  useCallback,
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
import Transactions from './containers/Transactions';
import reducer from './store/reducer';
import CreateTransaction from './components/CreateTransaction';
import './index.scss';

export const Context = createContext({});

const useMain = () => {
  const [transactionIsOpen, setTransactionIsOpen] = useState(false);

  return {
    transactionIsOpen,
    setTransactionIsOpen,
  }
};

const Home = ({ pullHomeData, ready, location }) => {
  const sidebarState = useSidebar();
  const mainState = useMain();

  useEffect(() => {
    pullHomeData();
  }, []);

  if (!ready) return <SiteLoader />;

  return (
    <Context.Provider value={{ ...sidebarState, ...mainState}}>
      <Sidebar />

      <animated.main
        style={sidebarState.mainStyle}
        className={'main h-full'}
      >
        <Header location={location} />

        <div className={'main-container'}>
          <Switch>
            <Route exact path={'/'}>
              <Redirect to={'/overview'}/>
            </Route>
            <Route path={'/overview'}>
              <h1>Overview</h1>
            </Route>
            <Route path={'/transactions'} component={Transactions} />
            <Route path={'/workspaces'}>
              <h1>Workspaces</h1>
            </Route>
            <Route path={'/settings'}>
              <h1>Settings</h1>
            </Route>
          </Switch>
        </div>
      </animated.main>

      <CreateTransaction />
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
