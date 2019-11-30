import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PageReady from 'components/PageReady';
import loadable from '@loadable/component';
import './index.scss';

import { url } from 'utils/constants';

import WithAuth, { AuthContext } from 'components/WithAuth';

import MainLayout from 'layouts/Main';
import AuthLaylout from 'layouts/Auth';

const Loader = () => <span>Loading...</span>;

const SigninLoaded = loadable(() => import('containers/Signin'));
const SignupLoaded = loadable(() => import('containers/Signup'));
const RestorePasswordLoaded = loadable(() => import('containers/RestorePassword'));
const ProjectLoaded = loadable(() => import('containers/Project'));

const App = () => (
	<WithAuth>
		<AuthContext.Consumer>
			{
				({ ready, isAuth }) => {
					if (!ready) return;

					let routes = (
						<PageReady>
							<MainLayout>
								<Suspense fallback={<Loader />}>
									<Switch>
										<Route path={url.home.project.index} component={ProjectLoaded} />
										<Redirect from={url.index} to={url.home.project.index} />
									</Switch>
								</Suspense>
							</MainLayout>
						</PageReady>
					);

					if (!isAuth) {
						routes = (
							<AuthLaylout>
								<Suspense fallback={<Loader />}>
									<Switch>
										<Route path={url.auth.signin.index} component={SigninLoaded} />
										<Route path={url.auth.signup.index} component={SignupLoaded} />
										<Route path={url.auth.restore.index} component={RestorePasswordLoaded} />
										<Redirect from={url.index} to={url.auth.signin.index} />
									</Switch>
								</Suspense>
							</AuthLaylout>
						);
					}

					return (
						<PageReady>
							{routes}
						</PageReady>
					);
				}
			}
		</AuthContext.Consumer>
	</WithAuth>
);

export default App;
