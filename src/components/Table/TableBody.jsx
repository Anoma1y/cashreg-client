import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { useValueAndKey, getUnhandledProps, } from 'utils/ui';

const TableBody = props => {
	const {
		children,
		className,
	} = props;

	const classes = cx(
		className,
	);

	const restProps = getUnhandledProps(TableBody, props);

	return (
		<tbody {...restProps} className={classes}>{children}</tbody>
	)
};

TableBody.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

export default TableBody;
