import { TOKEN_CONSTANT } from 'utils/constants';
import Api from 'api';
import history from 'store/history';
import Cookie from './cookie';
import Storage from './localStorage';

export function setAuthToken(data, rememberMe) {
	try {
		const { access_token, refresh_token, created_at, expires_at } = data;

		if (rememberMe) {
			const minutes = (expires_at - created_at) / 1000 / 60;

			Cookie.setExpiresMinutes('access_token', access_token, minutes);
			Cookie.set('remember_me', 'true', { expires: 60 });
			Cookie.set('refresh_token', refresh_token, { expires: 60 });
			Cookie.set('token_expires_at', expires_at, { expires: 60 });
		} else {
			Cookie.set('access_token', access_token);
			Cookie.set('refresh_token', refresh_token);
			Cookie.set('token_expires_at', expires_at, { expires: 60 });
		}
	} catch (e) {
		console.log(e);
	}
}

export function logout() {
	Storage.clearStorage();
	Cookie.removeAll();

	history.replace('/auth/signin');
}

export const isTokenExpired = expires_at => new Date(expires_at) < new Date();

export function getToken() {
	if (TOKEN_CONSTANT.auth_store === TOKEN_CONSTANT.auth_store_cookie) {
		return Cookie.get(TOKEN_CONSTANT.access_token_key);
	}

	return Storage.getItem(TOKEN_CONSTANT.access_token_key);
}

export function checkToken() {
	let token = getToken();
	let hasToken = false;
	let isTokenExpires = false;

	if (TOKEN_CONSTANT.auth_store === TOKEN_CONSTANT.auth_store_local) {
		token = token[TOKEN_CONSTANT.access_token_key];
		hasToken = !!token && !!token[TOKEN_CONSTANT.access_token_key];
		isTokenExpires = isTokenExpired(token[TOKEN_CONSTANT.expires_token_key] * 1000);
	} else if (TOKEN_CONSTANT.auth_store === TOKEN_CONSTANT.auth_store_cookie) {
		hasToken = !!token;
	}

	const isTokenValid = hasToken && !isTokenExpires;

	return {
		token,
		isTokenValid,
	};
}

export async function setTokenApi(token) {
	Api.http.defaults.headers['Authorization'] = `${TOKEN_CONSTANT.token_type}${token}`;
}

export async function initAuth() {
	try {
		const { token, isTokenValid } = checkToken();

		if (isTokenValid) {
			return token;
		}

		const refresh_token = Cookie.get('refresh_token');

		const data = await Api.refreshToken(refresh_token);

		setAuthToken(data.data.data);

		console.log('refresh token');

		return data.data.data.access_token;
	} catch (e) {
		throw new Error(e);
	}
}
