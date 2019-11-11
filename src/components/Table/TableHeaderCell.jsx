import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { useValueAndKey, getUnhandledProps, } from 'utils/ui';

const TableHeaderCell = props => {
	const {
		className,
		sorted,
	} = props;

	const classes = cx(
		useValueAndKey(sorted, 'sorted'),
		className,
	);

	const restProps = getUnhandledProps(TableHeaderCell, props);

	return (
		<th {...restProps} className={classes} />
	)
};

TableHeaderCell.propTypes = {
	className: PropTypes.string,
	sorted: PropTypes.oneOf(['asc', 'desc']),
};

export default TableHeaderCell;
