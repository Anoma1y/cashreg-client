import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { useKeyOnly, getUnhandledProps } from 'utils/ui';

const TableHeader = props => {
	const { children, className, fullwidth } = props;

	const classes = cx(useKeyOnly(fullwidth, 'full-width'), className);

	const restProps = getUnhandledProps(TableHeader, props);

	return (
		<thead {...restProps} className={classes}>
			{children}
		</thead>
	);
};

TableHeader.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	fullwidth: PropTypes.bool,
};

export default TableHeader;
