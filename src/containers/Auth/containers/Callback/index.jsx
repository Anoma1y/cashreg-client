import React, {
	memo,
	useEffect,
} from 'react';
import queryString from 'query-string';
import Storage from 'utils/localStorage';
import history from 'store/history';
import Api from 'api';


const Callback = ({ location }) => {
	const handleCallback = async () => {
		const { code, type } = queryString.parse(location.search);

		if (typeof code === 'undefined' || typeof type === 'undefined') {
			return;
		}

		try {
			if (type === 'google') {
				const data = await Api.modules.auth.loginViaGoogle(code);

				Storage.setItem('auth_data', data.data.data);
				Api.addHeader('Authorization', data.data.data.access_token)
			}
		} catch (e) {
			console.error(e.response)
		}
	};

	useEffect(() => {
		handleCallback()
			.then(() => {
				console.log('google auth ok - redirect');
				history.replace('/');
			})
			.catch(console.error)
	}, []);

	return null;
};

export default memo(Callback);
