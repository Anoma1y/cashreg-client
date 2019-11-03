import axios from 'axios';
import config from './config';
import codes from './codes';
import Modules from './Modules/_index';
import Cookie from 'utils/cookie';
import store from 'store/configureStore';
import { changeError } from 'containers/store/actions';

class ApiService {
	constructor() {
		this.codes = codes;
		this.http = null;
		this.modules = {};
		this.error_codes =[
			[429, 429],
			[500, 599],
		];
	}
	
	setModules(modules) {
		this.modules = { ...this.modules, ...modules };
	}
	
	init = () => {
		this.http = axios.create({
			baseURL: config.BASE_URL,
			timeout: config.TIMEOUT,
			headers: {
				...config.HEADERS,
			},
		});
		
		const generatedModules = {};
		
		for (const mod in Modules) {
			if (Modules.hasOwnProperty(mod)) {
				const moduleKey = mod.replace(/([Aa]pi[Mm]odule)/g, '').toLocaleLowerCase();
				
				generatedModules[moduleKey] = new Modules[mod](this.http);
			}
		}

		this.registerBeforeInterceptor();
		this.registerAfterInterceptor();

		this.setModules(generatedModules);
	};

	addHeader(key, value) {
		this.http.defaults.headers = {
			...this.http.defaults.headers,
			[key]: value,
		};
	}

	removeHeader(key) {
		if (key in this.http.defaults.headers) {
			delete this.http.defaults.headers[key];
			
			return true;
		}

		return false;
	}

	isServerError = err => {
		if (err.response && err.response.status) {
			let isInRange = false;

			for (const [min, max] of this.error_codes) {
				const status = err.response.status;

				if (status >= min && status <= max) {
					isInRange = true;
					break;
				}
			}

			return isInRange;
		}

		return false;
	};

	onResponseFulfilled = res => res;

	onResponseError = err => {
		if (this.isServerError(err)) {
			store.dispatch(changeError(this.codes.TOO_MANY_REQUESTS));

			Cookie.setExpiresMinutes('error_codes', err.response.status.toString(), 10);
		}

		return Promise.reject(err);
	};

	registerBeforeInterceptor() {
		this.http.interceptors.request.use(
			config => config,
			error => Promise.reject(error)
		);
	}

	registerAfterInterceptor() {
		this.http.interceptors.response.use(
			this.onResponseFulfilled,
			this.onResponseError
		);
	}
}

const Api = new ApiService();

Api.init();

export default Api;
