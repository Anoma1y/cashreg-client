import axios from 'axios';
import Cookie from 'utils/cookie';
import store from 'store/configureStore';
import { changeError } from 'containers/store/actions';
import history from 'store/history';
import { setAuthToken } from 'utils/auth';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import Modules from './Modules/_index';
import config from './config';
import codes from './codes';

const http = axios.create({
	baseURL: config.BASE_URL,
	timeout: config.TIMEOUT,
	headers: {
		...config.HEADERS,
	},
});

export const signin = data => http.post('/session', { ...data });

export const refreshToken = token => http.post('/session/refresh', { refreshToken: token });

export const getWorkspaceList = () => http.get('/workspace');

export const getCurrencyList = () => http.get('/currency');

export const getMe = () => http.get('/me');

const refreshAuthLogic = failedRequest => {
	const refresh_token = Cookie.get('refresh_token');

	return refreshToken(refresh_token).then(data => {
		setAuthToken(data.data.data);
		failedRequest.response.config.headers[
			'Authorization'
		] = `Bearer ${data.data.data.access_token}`;
		return Promise.resolve();
	});
};

createAuthRefreshInterceptor(http, refreshAuthLogic, {
	statusCodes: [403],
});

// const generatedModules = {};
//
// for (const mod in Modules) {
// 	if (Modules.hasOwnProperty(mod)) {
// 		const moduleKey = mod.replace(/([Aa]pi[Mm]odule)/g, '').toLocaleLowerCase();
//
// 		generatedModules[moduleKey] = new Modules[mod](this.http);
// 	}
// }

export default http;
