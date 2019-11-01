class Profile {
	constructor(http) {
		this.http = http;
	}

	getMe() {
		return this.http.get('/user/me');
	}
}

export default Profile;
