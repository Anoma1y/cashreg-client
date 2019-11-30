import React, { useState, useEffect, memo } from 'react';
import { connect } from 'react-redux';
import Cookie from 'utils/cookie';
import PropTypes from 'prop-types';
// import { changeError } from 'src/containers1/store/actions';
import { createStructuredSelector } from 'reselect';
// import { makeSelectError } from 'src/containers/store/selectors';
import ErrorPage from 'components/ErrorPage';
import SiteLoader from '../SiteLoader';

const ALLOWED_CODES = [
	'429',
	'500',
	'501',
	'502',
	'503',
	'504',
	'505',
	'506',
	'507',
	'508',
	'510',
	'511',
	'599',
];

const PageReady = props => {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const error_codes = Cookie.get('error_codes');

		if (error_codes) {
			// props.changeError(error_codes);
		}

		setReady(true);
	}, []);

	if (!ready) return <SiteLoader />;

	if (props.error) return <ErrorPage error={props.error} />;

	return props.children;
};

PageReady.propTypes = {
	ready: PropTypes.bool,
	children: PropTypes.node,
	error: PropTypes.oneOf(ALLOWED_CODES),
};
const mapStateToProps = () => ({
	error: null,
});
// const mapStateToProps = createStructuredSelector({
// 	error: null,
// 	// error: makeSelectError(),
// });

const mapDispatchToProps = {
	// changeError,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(memo(PageReady));
