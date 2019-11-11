import React, { useState, useEffect } from 'react';
import Cookie from 'utils/cookie';
import Storage from 'utils/localStorage';
import history from 'store/history';
import { setAuthToken, logout } from 'utils/auth';
import Api from 'api';

const AUTH_STORE = 'cookie';
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const EXPIRES_TOKEN_KEY = 'expires_at';
const AUTH_STORE_LOCAL = 'local';
const AUTH_STORE_COOKIE = 'cookie';
const TOKEN_TYPE = 'Bearer ';


const isTokenExpired = expires_at => new Date(expires_at * 1000) < new Date();

const getToken = () => (AUTH_STORE === AUTH_STORE_COOKIE ? Cookie.get(ACCESS_TOKEN_KEY) : Storage.getItem(ACCESS_TOKEN_KEY));

const checkToken = () => {
  let token = getToken();
  let hasToken = false;
  let isTokenExpires = false;

  if (AUTH_STORE === AUTH_STORE_LOCAL) {
    token = token[ACCESS_TOKEN_KEY];
    hasToken = !!token && !!token[ACCESS_TOKEN_KEY];
    isTokenExpires = isTokenExpired(token[EXPIRES_TOKEN_KEY]);
  } else if (AUTH_STORE === AUTH_STORE_COOKIE) {
    hasToken = !!token;
  }

  const isTokenValid = hasToken && !isTokenExpires;

  return {
    token,
    isTokenValid,
  };
};

const setTokenApi = async (token) => {
  Api.defaults.headers['Authorization'] = `${TOKEN_TYPE}${token}`;
};

const WithAuth = AuthComponent => props => {
  const [isAuth, setIsAuth] = useState(false);

  const toggleAuth = () => setIsAuth(true);

  const initAuth = async () => {
    try {
      const { token, isTokenValid } = checkToken();

      if (isTokenValid) {
        console.log('token valid')
        return token;
      } else {
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
        //   return newToken.data.data[ACCESS_TOKEN_KEY];
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
  }, []);

  return isAuth ? <AuthComponent {...props} /> : null;
};

export default WithAuth;
