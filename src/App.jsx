import React, { Suspense } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import loadable from '@loadable/component'
import './index.scss';

const Loader = () => <span>Loading...</span>;

const AuthLoaded = loadable(() => import('./containers/Auth'));
const HomeLoaded = loadable(() => import('./containers/Home'));

const App = () => (
  <Suspense fallback={<Loader />}>
    <Switch>
      <Route path={'/auth'} component={AuthLoaded} />
      <Route exact path={'/'} component={HomeLoaded} />
    </Switch>
  </Suspense>
);

export default App;
