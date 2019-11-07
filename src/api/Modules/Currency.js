class Currency {
	constructor(http) {
		this.http = http;
	}

	getList() {
		return this.http.get('/currency');
	}
}

export default Currency;
