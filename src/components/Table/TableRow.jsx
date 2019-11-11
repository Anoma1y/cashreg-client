import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { useValueAndKey, getUnhandledProps } from 'utils/ui';

const TableRow = props => {
	const {
		children,
		className,
		textAlign,
		verticalAlign,
	} = props;

	const classes = cx(
		className,
	);

	const restProps = getUnhandledProps(TableRow, props);

	return (
		<tr {...restProps} className={classes}>{children}</tr>
	)
};

TableRow.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	textAlign: PropTypes.oneOf(['left', 'right', 'center']),
	verticalAlign: PropTypes.oneOf(['bottom', 'middle', 'top']),
};

export default TableRow;
