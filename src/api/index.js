import axios from 'axios';
import Cookie from 'utils/cookie';
import store from 'store/configureStore';
// import { changeError } from 'src/containers1/store/actions';
import history from 'store/history';
import { setAuthToken } from 'utils/auth';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
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
api.getCategories = (wsid) => http.get(`/workspace/${wsid}/category`); // todo add query
api.getProjects = (wsid) => http.get(`/workspace/${wsid}/project`); // todo add query
api.getContragents = (wsid) => http.get(`/workspace/${wsid}/contragent`); // todo add query
api.getTransactions = (wsid, query = '') => http.get(`/workspace/${wsid}/transaction${query}`); // todo add query

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

export default api;
