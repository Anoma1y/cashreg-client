import React, { Component } from 'react';
import Cookie from 'utils/cookie';
import Storage from 'utils/localStorage';
import history from 'store/history';
import Api from 'api';

const AUTH_STORE = 'cookie';
const ACCESS_TOKEN_KEY = 'access_token';
const EXPIRES_TOKEN_KEY = 'expires_at';
const AUTH_STORE_LOCAL = 'local';
const AUTH_STORE_COOKIE = 'cookie';

const withAuth = AuthComponent => class AuthWrapped extends Component {
  state = {
    isAuth: false
  };

  componentWillMount() {
    const { token, isTokenValid } = this.checkToken();

    if (isTokenValid) {
      Api.addHeader('Authorization', token[ACCESS_TOKEN_KEY]);

      this.setState({ isAuth: true });
    } else {
      Storage.clearStorage();
      Cookie.removeAll();
      history.replace('/auth/signin');
    }
  }

  checkToken = () => {
    let token = this.getToken();
    let hasToken = false;
    let isTokenExpires = false;

    if (AUTH_STORE === AUTH_STORE_LOCAL) {
      token = token[ACCESS_TOKEN_KEY];
      hasToken = !!token && !!token[ACCESS_TOKEN_KEY];
      isTokenExpires = this.isTokenExpired(token[EXPIRES_TOKEN_KEY]);
    } else if (AUTH_STORE === AUTH_STORE_COOKIE) {
      hasToken = !!token;
    }

    const isTokenValid = hasToken && !isTokenExpires;

    return {
      token,
      isTokenValid,
    };
  };

  getToken = () => AUTH_STORE === AUTH_STORE_COOKIE ? Cookie.get(ACCESS_TOKEN_KEY) : Storage.getItem(ACCESS_TOKEN_KEY);

  isTokenExpired = expires_at => new Date(expires_at * 1000) < new Date();

  render() {
    const { isAuth } = this.state;

    return isAuth ? <AuthComponent /> : null;
  }
};

export default withAuth;
