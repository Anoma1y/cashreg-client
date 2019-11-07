import React, { Suspense } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import PageReady from 'components/PageReady';
import loadable from '@loadable/component'
import './index.scss';

const Loader = () => <span>Loading...</span>;

const AuthLoaded = loadable(() => import('./containers/Auth'));
const HomeLoaded = loadable(() => import('./containers/Home'));

const App = () => (
  <PageReady>
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route path={'/auth'} component={AuthLoaded} />
        <Route path={'/'} component={HomeLoaded} />
      </Switch>
    </Suspense>
  </PageReady>
);

export default App;
