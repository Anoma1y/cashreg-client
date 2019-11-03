const DEV_HOST = process.env.API_HOST + '/' + process.env.API_PREFIX;

export default {
	BASE_URL: DEV_HOST,
	TIMEOUT: 10000,
	HEADERS: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
};
