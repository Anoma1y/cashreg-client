import axios from 'axios';
import Cookie from 'utils/cookie';
import store from 'store/configureStore';
// import { changeError } from 'src/containers1/store/actions';
import history from 'store/history';
import { setAuthToken } from 'utils/auth';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { changeError } from 'store/app/actions';
import Modules from './Modules/_index';
import config from './config';
import codes from './codes';

export const http = axios.create({
	baseURL: config.BASE_URL,
	timeout: config.TIMEOUT,
	headers: {
		...config.HEADERS,
	},
});

const api = {
	codes,
	http,
};

api.checkEmailExist = (email = '') => http.get(`/user/email/check?email=${email}`);
api.signin = data => http.post('/session', { ...data });
api.refreshToken = token => http.post('/session/refresh', { refreshToken: token });
api.getWorkspaceList = () => http.get('/workspace');
api.getCurrencyList = () => http.get('/currency');
api.getMe = () => http.get('/me');

api.getCategoryList = function (workspace_id, query = '') {
	return http.get(`/workspace/${workspace_id}/category${query}`);
};

api.getProjectList = function (workspace_id, query = '') {
	return http.get(`/workspace/${workspace_id}/project${query}`);
};

api.getContragentList = function (workspace_id, query = '') {
	return http.get(`/workspace/${workspace_id}/contragent${query}`);
};

api.getTransactionList = function (workspace_id, query = '') {
	return http.get(`/workspace/${workspace_id}/transaction${query}`);
};

api.createTransaction = (workspace_id, data) => http.post(`/workspace/${workspace_id}/transaction`, { ...data });

const refreshAuthLogic = failedRequest => {
	const refresh_token = Cookie.get('refresh_token');

	return api.refreshToken(refresh_token).then(data => {
		setAuthToken(data.data.data);

		failedRequest.response.config.headers['Authorization'] = `Bearer ${data.data.data.access_token}`;

		return Promise.resolve();
	});
};

createAuthRefreshInterceptor(http, refreshAuthLogic, {
	statusCodes: [403],
});

const error_codes = [[429, 429], [500, 599]];

const isServerError = err => {
	if (err.response && err.response.status) {
		let isInRange = false;

		for (const [min, max] of error_codes) {
			const { status } = err.response;

			if (status >= min && status <= max) {
				isInRange = true;
				break;
			}
		}

		return [isInRange, err.response.status];
	}

	return false;
};

const onResponseFulfilled = res => res;

const onResponseError = err => {
	const [isServerErr, status] = isServerError(err);

	if (isServerErr) {
		if (status === api.codes.TOO_MANY_REQUESTS) {
			Cookie.setExpiresMinutes('error_codes', status.toString(), 10);
		}

		store.dispatch(changeError(status.toString()));
	}

	return Promise.reject(err);
};

// http.interceptors.request.use(config => config, error => Promise.reject(error));

http.interceptors.response.use(onResponseFulfilled, onResponseError);

export default api;
