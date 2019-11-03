import axios from 'axios';
import config from './config';
import codes from './codes';
import Modules from './Modules/_index';
import { Intent } from '@blueprintjs/core';
import { AppToater } from 'components/Toaster';

const ALLOWED_RETRY_METHODS = ['get', 'put', 'post', 'delete', 'head', 'options'];

const shouldRetry = (error) => {
	const { method: httpMethod, errorCodes } = error.config;
	const { maxAttempts, __retryCount: retryCount = 0 } = error.config;
	const { response: { status: statusCode } = {} } = error;

	let shouldRetryForMethod = false;
	let shouldRetryForStatus = false;

	if (ALLOWED_RETRY_METHODS.includes(httpMethod)) shouldRetryForMethod = true;

	if (
		(errorCodes.length === 0 && statusCode >= 500 && statusCode < 600) ||
		errorCodes.includes(statusCode)
	) {
		shouldRetryForStatus = true;
	}

	if (shouldRetryForMethod && shouldRetryForStatus && retryCount < maxAttempts) {
		return true;
	}

	return false;
};

class ApiService {
	constructor() {
		this.codes = codes;
		this.http = null;
		this.modules = {};
		this.blocked = false;
		this.retryConfig = {
			maxAttempts: 3,
			waitTime: 1000,
			errorCodes: [429, 403, 500, 501, 401]
		};
	}
	
	setModules(modules) {
		this.modules = { ...this.modules, ...modules };
	}
	
	init() {
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
	}

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

	registerBeforeInterceptor() {
		this.http.interceptors.request.use(
			(config) => Object.assign(config, this.retryConfig),

			(error) => Promise.reject(error)
		);
	}

	registerAfterInterceptor() {
		this.http.interceptors.response.use(
			(response) => response,
			(error) => {
				if (error.config && shouldRetry(error)) {
					const { __retryCount: retryCount = 0 } = error.config;

					error.config.__retryCount = retryCount + 1;
					error.config.__isRetryRequest = true;

					const waitTime = Number.isInteger(error.config.waitTime) ? error.config.waitTime : 0;

					if (waitTime > 0) {
						return new Promise((resolve, reject) => {
							setTimeout(() => resolve(error.config), waitTime);
						});
					}

					return axios(error.config);
				}
				return Promise.reject(error);

				// if (error.response.status === this.codes.TOO_MANY_REQUESTS) {
				// 	AppToater.show({ message: "Too Many Requests", intent: Intent.DANGER });
				//
				// 	this.blocked = true;
				//
				// 	setTimeout(() => {
				// 		this.blocked = false;
				// 	}, 10000)
				// }
				// return Promise.reject(error);
			}
		);
	}

}

const Api = new ApiService();

Api.init();

export default Api;
