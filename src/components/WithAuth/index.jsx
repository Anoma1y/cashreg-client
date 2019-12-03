import React, { useState, useEffect, createContext } from 'react';
import Cookie from 'utils/cookie';
import Storage from 'utils/localStorage';
import history from 'store/history';
import { setAuthToken, logout } from 'utils/auth';
import Api from 'api';
import { tokenInfo } from 'utils/constants';

const isTokenExpired = expires_at => new Date(expires_at * 1000) < new Date();

const getToken = () => {
	if (tokenInfo.auth_store === tokenInfo.auth_store_cookie) {
		return Cookie.get(tokenInfo.access_token_key);
	}

	return Storage.getItem(tokenInfo.access_token_key);
};

const checkToken = () => {
	let token = getToken();
	let hasToken = false;
	let isTokenExpires = false;

	if (tokenInfo.auth_store === tokenInfo.auth_store_local) {
		token = token[tokenInfo.access_token_key];
		hasToken = !!token && !!token[tokenInfo.access_token_key];
		isTokenExpires = isTokenExpired(token[tokenInfo.expires_token_key]);
	} else if (tokenInfo.auth_store === tokenInfo.auth_store_cookie) {
		hasToken = !!token;
	}

	const isTokenValid = hasToken && !isTokenExpires;

	return {
		token,
		isTokenValid,
	};
};

const setTokenApi = async token => {
	console.log('before set token');
	Api.http.defaults.headers['Authorization'] = `${tokenInfo.token_type}${token}`;
	console.log('after set token');
};

const WithAuth = (props) => {
	const [ready, setReady] = useState(false);
	const [isAuth, setIsAuth] = useState(false);

	const toggleAuth = () => setIsAuth(true);

	const initAuth = async () => {
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
	};

	useEffect(() => {
		initAuth()
			.then(setTokenApi)
			.then(toggleAuth)
			.catch(logout)
			.finally(() => setReady(true))
	}, []);
	console.log(ready, isAuth)
	return (ready && isAuth) ? props.children : <h1>loading</h1>;
};

export default WithAuth;
