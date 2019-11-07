class User {
	constructor(http) {
		this.http = http;
	}

	getMe() {
		return this.http.get('/me');
	}
}

export default User;
