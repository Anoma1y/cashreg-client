class Auth {
	constructor(http) {
		this.http = http;
	}

	signin(data) {
		return this.http.post('/session', {
			...data
		});
	}

	signup(data) {
		return this.http.post('/user/create', {
			...data
		});
	}

	verifyEmail(user_id, data) {
		return this.http.post(`/user/${user_id}/verify`, {
			...data
		});
	}
	
	checkEmailExist(email = '') {
		return this.http.get(`/user/email/check?email=${email}`);
	}
	
	refreshToken(token) {
		return this.http.post('/session/refresh', {
			refreshToken: token,
		});
	}

	logout() {
		return this.http.delete('/session');
	}
	
	logoutAll() {
		return this.http.delete('/session/all');
	}
}

export default Auth;
