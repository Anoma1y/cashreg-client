import React, { Fragment } from 'react';
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Transactions from './containers/Transactions';
import MyEvents from './containers/MyEvents';
import Events from './containers/Events';
import EventsCreate from './containers/EventsCreate';

const Home = () => (
  <Fragment>
    <ul style={{ marginBottom: 40, }}>
      <li><Link to={'/transactions'}>Transactions</Link></li>
    </ul>
    {/*<Switch>*/}
    {/*</Switch>*/}
  </Fragment>
);

export default Home;
