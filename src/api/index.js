import axios from 'axios';
import config from './config';
import codes from './codes';
import Modules from './Modules/_index';

class ApiService {
	constructor() {
		this.codes = codes;
		this.http = null;
		this.modules = {};
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
}

const Api = new ApiService();

Api.init();

export default Api;
