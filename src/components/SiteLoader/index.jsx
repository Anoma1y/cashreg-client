import React from 'react';
import { Spinner } from '@blueprintjs/core';
import PropTypes from 'prop-types';

const SiteLoader = ({ value, size = Spinner.SIZE_STANDARD }) => (
	<div className={'site-loader'}>
		<Spinner className={'site-loader_spinner'} size={size} value={value} />
	</div>
);

SiteLoader.propTypes = {
	value: PropTypes.number,
	size: PropTypes.number,
};

export default SiteLoader;
