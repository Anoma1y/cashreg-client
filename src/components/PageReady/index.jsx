import React, {
	useState,
	useEffect,
	memo,
} from 'react';
import { connect } from 'react-redux';
import Cookie from 'utils/cookie';
import PropTypes from 'prop-types';
import SiteLoader from '../SiteLoader';
import { changeError } from 'containers/store/actions';
import { createStructuredSelector } from 'reselect';
import { makeSelectError } from 'containers/store/selectors';
import ErrorPage from 'components/ErrorPage';

const ALLOWED_CODES = ['429'];

const PageReady = props => {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const error_codes = Cookie.get('error_codes');

		if (error_codes) {
			props.changeError(error_codes);
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

const mapStateToProps = createStructuredSelector({
	error: makeSelectError(),
});

const mapDispatchToProps = {
	changeError,
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(PageReady));
