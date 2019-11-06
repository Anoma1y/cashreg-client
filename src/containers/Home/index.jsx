import React, {
  Fragment,
  createContext,
} from 'react';
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import WithAuth from 'components/WithAuth';
import { animated } from 'react-spring';
import Sidebar, { useSidebar } from './components/Sidebar';
import Header from './components/Header';
import './index.scss';

export const Context = createContext({});

const Home = () => {
  const sidebarState = useSidebar();

  return (
    <Context.Provider value={sidebarState}>
      <Sidebar />

      <animated.main
        style={sidebarState.mainStyle}
        className={'main h-full'}
      >
        <Header />
      </animated.main>
    </Context.Provider>
  )
}

export default WithAuth(Home);
