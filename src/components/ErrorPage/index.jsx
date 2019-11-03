import React, {
	memo,
	useEffect,
} from 'react';
import PropTypes from 'prop-types';
import Codes, { errorMessages } from 'api/codes';
import './index.scss';

const ErrorPage = ({ error }) => {
	const msg = errorMessages[error];
	const isTooManyRequests = parseInt(error) === Codes.TOO_MANY_REQUESTS;
	const oops = isTooManyRequests
		? 'Oops! It looks like you were making too many requests and so you have been throttled.'
		: 'Ooops.... Something went wrong';
	const text = isTooManyRequests
		? 'Please try again in 10 minutes.'
		: 'The server encountered an internal error or misconfiguration and was unable to complete your request';

	useEffect(() => {
		document.title = msg || error;
	});

	return (
		<div className={'server-error'}>
			<div className={'server-error-content'}>
				<h2 className={'server-error-content_title'}>Error {error}</h2>

				{msg && <span className={'server-error-content_desc'}>({msg})</span>}

				<p className={'server-error-content_oops'}>{oops}</p>

				<span className={'server-error-content_text'}>{text}</span>
			</div>
		</div>
	)
};

ErrorPage.propTypes = {
	error: PropTypes.string.isRequired,
};

export default memo(ErrorPage);
