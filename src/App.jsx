import React, { Suspense } from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import loadable from '@loadable/component'
import './index.scss';

const Loader = () => <span>Loading...</span>;

const HomeLoaded = loadable(() => import('./containers/Home'));

const App = () => (
  <div className={'app'}>
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route path={'/'} component={HomeLoaded} />
      </Switch>
    </Suspense>
  </div>
);

export default App;
