import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { useKeyOnly, getUnhandledProps } from 'utils/ui';

const TableCell = props => {
	const {
		active,
		children,
		className,
		collapsing,
		disabled,
		error,
		selectable,
		singleLine,
		positive,
		negative,
		textAlign,
		verticalAlign,
		warning,
		colSpan,
	} = props;

	const classes = cx(
		useKeyOnly(disabled, 'disabled'),
		useKeyOnly(collapsing, 'collapsing'),
		useKeyOnly(active, 'active'),
		useKeyOnly(error, 'error'),
		useKeyOnly(positive, 'positive'),
		useKeyOnly(negative, 'negative'),
		useKeyOnly(selectable, 'selectable'),
		useKeyOnly(singleLine, 'singleLine'),
		useKeyOnly(warning, 'warning'),
		className,
	);

	return (
		<td colSpan={colSpan} className={classes}>
			{children}
		</td>
	);
};

TableCell.propTypes = {
	active: PropTypes.bool,
	children: PropTypes.node,
	className: PropTypes.string,
	collapsing: PropTypes.bool,
	disabled: PropTypes.bool,
	error: PropTypes.bool,
	selectable: PropTypes.bool,
	positive: PropTypes.bool,
	negative: PropTypes.bool,
	singleLine: PropTypes.bool,
	warning: PropTypes.bool,
	// width: PropTypes.oneOf(SUI.WIDTHS),
};

export default TableCell;
