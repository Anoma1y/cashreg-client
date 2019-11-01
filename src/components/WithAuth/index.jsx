import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import Storage from 'utils/localStorage';
import Api from 'api';

const AUTH_TOKEN = 'auth_data';

const withAuth = (AuthComponent) => class AuthWrapped extends Component {

  state = {
    isAuth: false
  };

  componentWillMount() {
    const { token, isTokenValid } = this.checkToken();

    if (isTokenValid) {
      Api.addHeader('Authorization', token.access_token);

      this.setState({ isAuth: true })
    } else {
      Storage.clearStorage();
      this.props.replace('/auth');
    }
  }

  checkToken = () => {
    const token = this.getToken(AUTH_TOKEN);
    const isTokenValid = !!token && !!token.access_token && !this.isTokenExpired(token.expires_at);

    return {
      token,
      isTokenValid
    };
  };

  isTokenExpired = (expires_at) => {
    const currentDate = new Date();
    const expiresDate = new Date(expires_at * 1000);

    return expiresDate < currentDate;
  };

  getToken = (tokenName = 'auth_data') => Storage.getItem(tokenName);

  render() {
    const { isAuth } = this.state;

    return isAuth ? <AuthComponent /> : null;
  }
};

export default compose(
  connect(null, { replace }),
  withAuth
);
