class Workspace {
	constructor(http) {
		this.http = http;
	}

	getList() {
		return this.http.get('/workspace');
	}
}

export default Workspace;
