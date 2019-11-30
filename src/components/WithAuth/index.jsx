import React, { useState, useEffect, createContext } from 'react';
import Cookie from 'utils/cookie';
import Storage from 'utils/localStorage';
import history from 'store/history';
import { setAuthToken, logout } from 'utils/auth';
import Api from 'api';
import { tokenInfo } from 'utils/constants';

export const AuthContext = createContext(null);

const isTokenExpired = expires_at => new Date(expires_at * 1000) < new Date();

const getToken = () =>
	(tokenInfo.auth_store === tokenInfo.auth_store_cookie
		? Cookie.get(tokenInfo.access_token_key)
		: Storage.getItem(tokenInfo.access_token_key));

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
	Api.http.defaults.headers['Authorization'] = `${tokenInfo.token_type}${token}`;
};

const WithAuth = (props) => {
	console.log('update WithAuth')
	const [ready, setReady] = useState(false);
	const [isAuth, setIsAuth] = useState(false);

	const toggleAuth = () => setIsAuth(true);

	const initAuth = async () => {
		try {
			const { token, isTokenValid } = checkToken();

			if (isTokenValid) {
				console.log('token valid');
				return token;
			} else {
				throw new Error('')
				// console.log('begin refresh token')
				// const refreshToken = Cookie.get(REFRESH_TOKEN_KEY);
				// const rememberMe = Cookie.get('remember_me');
				//
				// if (rememberMe && refreshToken) {
				//   console.log('refresh token found')
				//   const newToken = await Api.modules.auth.refreshToken(refreshToken);
				//
				//   setAuthToken(newToken.data.data, true);
				//
				//   return newToken.data.data[tokenInfo.access_token_key];
				// } else {
				//   console.log('refresh token not found')
				//   throw 'Refresh auth token error'; // todo ??
				// }
			}
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

	return (
		<AuthContext.Provider value={{ ready, isAuth, setIsAuth }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default WithAuth;
