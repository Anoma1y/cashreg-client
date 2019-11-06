export default {
	Store: window.localStorage,

	setItem(key, value) {
		const StringifyValue = JSON.stringify(value);

		this.Store.setItem(key, StringifyValue);
		return true;
	},

	getItem(key, toParse = true) {
		const data = this.Store.getItem(key);

		if (data === null) {
			return null;
		}

		return toParse ? JSON.parse(data) : data;
	},

	hasItem(key) {
		return this.Store.getItem(key) !== null;
	},

	removeItem(key, callback = false) {
		if (callback) {
			if (this.Store.getItem(key) === null) {
				return false;
			}

			this.Store.removeItem(key);
			return true;
		}
		this.Store.removeItem(key);
	},

	clearStorage(callback = false) {
		if (callback) {
			this.Store.clear();
			return true;
		}

		this.Store.clear();
	},
};
