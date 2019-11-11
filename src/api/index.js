import axios from 'axios';
import config from './config';
// import Modules from './Modules/_index';
import Cookie from 'utils/cookie';
import store from 'store/configureStore';
import { changeError } from 'containers/store/actions';

import history from 'store/history';
import { setAuthToken } from 'utils/auth';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import codes from './codes';

// const defaults = {
//
// 	statusCodes: [
// 		403 // Unauthorized
// 	]
// };
//
// function createAuthRefreshInterceptor (axios, refreshTokenCall, options = {}) {
// 	const id = axios.interceptors.response.use(res => res, error => {
//
// 		const statusCodes = options.hasOwnProperty('statusCodes') && options.statusCodes.length
// 			? options.statusCodes
// 			: defaults.statusCodes;
// 		if (!error.response || (error.response.status && statusCodes.indexOf(+error.response.status) === -1)) {
// 			return Promise.reject(error);
// 		}
//
// 		axios.interceptors.response.eject(id);
//
// 		const refreshCall = refreshTokenCall(error);
//
// 		const requestQueueInterceptorId = axios.interceptors
// 			.request
// 			.use(request => refreshCall.then(() => request));
//
// 		return refreshCall.then(() => {
// 			axios.interceptors.request.eject(requestQueueInterceptorId);
// 			return axios(error.response.config);
// 		}).catch(error => {
// 			axios.interceptors.request.eject(requestQueueInterceptorId);
// 			return Promise.reject(error)
// 		}).finally(() => createAuthRefreshInterceptor(axios, refreshTokenCall, options));
// 	});
// 	return axios;
// }

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

export default http;

// class ApiService {
// 	constructor() {
// 		this.codes = codes;
// 		this.http = null;
// 		this.modules = {};
// 		this.isRefreshing = false;
// 		this.error_codes = [[429, 429], [500, 599]];
// 	}
//
// 	setModules(modules) {
// 		this.modules = { ...this.modules, ...modules };
// 	}
//
// 	init = () => {
// 		this.http = axios.create({
// 			baseURL: config.BASE_URL,
// 			timeout: config.TIMEOUT,
// 			headers: {
// 				...config.HEADERS,
// 			},
// 		});
//
// 		const generatedModules = {};
//
// 		for (const mod in Modules) {
// 			if (Modules.hasOwnProperty(mod)) {
// 				const moduleKey = mod.replace(/([Aa]pi[Mm]odule)/g, '').toLocaleLowerCase();
//
// 				generatedModules[moduleKey] = new Modules[mod](this.http);
// 			}
// 		}
//
// 		this.registerBeforeInterceptor();
// 		this.registerAfterInterceptor();
//
// 		this.setModules(generatedModules);
// 	};
//
// 	addHeader(key, value) {
// 		this.http.defaults.headers = {
// 			...this.http.defaults.headers,
// 			[key]: value,
// 		};
// 	}
//
// 	removeHeader(key) {
// 		if (key in this.http.defaults.headers) {
// 			delete this.http.defaults.headers[key];
//
// 			return true;
// 		}
//
// 		return false;
// 	}
//
// 	isServerError = err => {
// 		if (err.response && err.response.status) {
// 			let isInRange = false;
//
// 			for (const [min, max] of this.error_codes) {
// 				const status = err.response.status;
//
// 				if (status >= min && status <= max) {
// 					isInRange = true;
// 					break;
// 				}
// 			}
//
// 			return isInRange;
// 		}
//
// 		return false;
// 	};
//
// 	onResponseFulfilled = res => res;
//
// 	onResponseError = error => {
// 		const { status, data } = error.response;
// 		const isServerErr = this.isServerError(error);
//
// 		if (isServerErr) {
// 			if (status === Api.codes.TOO_MANY_REQUESTS) {
// 				Cookie.setExpiresMinutes('error_codes', status.toString(), 10);
// 			}
//
// 			store.dispatch(changeError(status.toString()));
// 		}
//
// 		if (status === Api.codes.FORBIDDEN && data && data.action === 'AUTHORIZATION_TOKEN_NOT_CORRECT') {
// 			const refresh_token = Cookie.get('refresh_token');
// 			const remember_me = Cookie.get('remember_me');
// 			// const config = error.config;
//
// 			// const refreshCall = this.modules.auth.refreshToken(refresh_token)
// 			// 	.then((data) => {
// 			// 		setAuthToken(data.data.data)
// 			// 		config.headers['Authorization'] = `Bearer ${data.data.data.access_token}`;
// 			// 	})
// 			// 	.catch(console.error)
// 			// // Create interceptor that will bind all the others requests
// 			// // until refreshTokenCall is resolved
// 			// const requestQueueInterceptorId = this.http.interceptors
// 			// 	.request
// 			// 	.use(request => refreshCall.then(() => request));
// 			//
// 			// // When response code is 401 (Unauthorized), try to refresh the token.
// 			// return refreshCall.then(() => {
// 			// 	this.http.interceptors.request.eject(requestQueueInterceptorId);
// 			//
// 			// 	return this.http(config);
// 			// }).catch(error => {
// 			// 	this.http.interceptors.request.eject(requestQueueInterceptorId);
// 			//
// 			// 	return Promise.reject(error)
// 			// })
//
//
//
//
// 		} else {
// 			return Promise.reject(error);
//
// 		}
//
// 	};
//
// 	registerBeforeInterceptor() {
// 		this.http.interceptors.request.use(config => config, error => Promise.reject(error));
// 	}
//
// 	registerAfterInterceptor() {
// 		this.http.interceptors.response.use(this.onResponseFulfilled, this.onResponseError);
// 	}
// }
//
// const Api = new ApiService();
//
// Api.init();
//
// export default Api;
