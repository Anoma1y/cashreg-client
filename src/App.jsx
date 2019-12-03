import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PageReady from 'components/PageReady';
import loadable from '@loadable/component';
import './index.scss';

import { url } from 'utils/constants';

import WithAuth from 'components/WithAuth';

import MainLayout from 'layouts/Main';
import AuthLaylout from 'layouts/Auth';

const Loader = () => <span>Loading...</span>;

const SigninLoaded = loadable(() => import('containers/Signin'));
const SignupLoaded = loadable(() => import('containers/Signup'));
const RestorePasswordLoaded = loadable(() => import('containers/RestorePassword'));

const ProjectLoaded = loadable(() => import('containers/Project'));
const WorkspaceLoaded = loadable(() => import('containers/Workspace'));


const App = () => {
	return (
		<PageReady>
			<Switch>
				<Route path={url.auth.index}>
					<AuthLaylout>
						<Suspense fallback={<Loader />}>
							<Route path={url.auth.signin.index} component={SigninLoaded} />
							<Route path={url.auth.signup.index} component={SignupLoaded} />
							<Route path={url.auth.restore.index} component={RestorePasswordLoaded} />
							<Redirect from={url.auth.index} to={url.auth.signin.index} />
						</Suspense>
					</AuthLaylout>
				</Route>
				<Route path={url.index}>
					<WithAuth>
						<MainLayout>
							<Suspense fallback={<Loader />}>
								<Switch>
									<Route path={url.home.project.index} component={ProjectLoaded} />
									<Route path={url.home.workspace.index} component={WorkspaceLoaded} />
									<Redirect from={url.index} to={url.home.project.index} />
								</Switch>
							</Suspense>
						</MainLayout>
					</WithAuth>
				</Route>
			</Switch>
		</PageReady>
	);
};

export default App;
