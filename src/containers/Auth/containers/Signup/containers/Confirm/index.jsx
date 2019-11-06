import React, {
	useEffect,
	useState,
} from 'react';
import { Link } from 'react-router-dom';
import { parseParams } from 'utils/helpers';
import SiteLoader from 'components/SiteLoader';
import Api from 'api';
import history from 'store/history';

const Confirm = ({ location }) => {
	const [error, setError] = useState(null);

	useEffect(() => {
		const { user_id, code_id, code, } = parseParams(location.search);

		if (user_id && code_id && code) {
			Api.modules.auth.verifyEmail(user_id, {
				token_id: code_id,
				token: code,
			})
				.then(() => {
					history.replace('/auth/signup/success');
				})
				.catch(() => {
					setError(true);
				})
		}
	}, []);

	const renderError = () => (
		<div>
			<p>Activation Error</p>
			<Link to={'/auth/signup'}>Go To Signup</Link>
		</div>
	);

	return error ? renderError() : <SiteLoader />;
};

export default Confirm;
