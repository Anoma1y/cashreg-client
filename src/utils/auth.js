import history from 'store/history';
import Cookie from './cookie';
import Storage from './localStorage';

export const setAuthToken = (data, rememberMe) => {
	try {
		const {
			access_token,
			refresh_token,
			created_at,
			expires_at,
		} = data;

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
};

export const logout = () => {
	Storage.clearStorage();
	Cookie.removeAll();
	console.log('logout');
	history.replace('/auth/signin');
};
