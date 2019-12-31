import React, { useState, useEffect, createContext } from 'react';
import Cookie from 'utils/cookie';
import { setAuthToken, setTokenApi, initAuth, logout } from 'utils/auth';
import Api from 'api';

const WithAuth = (props) => {
	const [ready, setReady] = useState(false);
	const [isAuth, setIsAuth] = useState(false);

	const toggleAuth = () => setIsAuth(true);

	useEffect(() => {
		initAuth()
			.then(setTokenApi)
			.then(toggleAuth)
			.catch(logout)
			.finally(() => setReady(true));
	}, []);

	return (ready && isAuth) ? props.children : <h1>loading</h1>;
};

export default WithAuth;
