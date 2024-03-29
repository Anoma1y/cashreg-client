import Cookie from 'js-cookie';

class CookieService {
	static getExpiresMinutes = (minutes = 10) => new Date(new Date().getTime() + minutes * 60 * 1000);

	static get = key => Cookie.get(key);

	static set = (key, val, opt = {}) => {
		Cookie.set(key, val, opt);
	};

	static setExpiresMinutes = (key, val, minutes) => {
		Cookie.set(key, val, {
			expires: CookieService.getExpiresMinutes(minutes),
		});
	};

	static remove = key => Cookie.remove(key);

	static removeAll = () => {
		Object.keys(Cookie.get()).forEach(cookie => {
			Cookie.remove(cookie);
		});
	};
}

export default CookieService;
