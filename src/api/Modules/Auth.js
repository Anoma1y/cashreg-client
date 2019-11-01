class Auth {
	constructor(http) {
		this.http = http;
	}

	loginViaGoogle(auth_code) {
		return this.http.post('/auth/google', {
			auth_code
		});
	}
}

export default Auth;
