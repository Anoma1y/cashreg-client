import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { useValueAndKey, useKeyOnly, getUnhandledProps } from 'utils/ui';

const TableHeaderCell = props => {
	const { className, sorted, onClick } = props;

	const classes = cx(
		useValueAndKey(sorted, 'sorted'),
		useKeyOnly(onClick, 'pointer'),
		className,
	);

	const restProps = getUnhandledProps(TableHeaderCell, props);

	return <th {...restProps} onClick={onClick} className={classes} />;
};

TableHeaderCell.propTypes = {
	className: PropTypes.string,
	onClick: PropTypes.func,
	sorted: PropTypes.oneOf(['ascending', 'descending']),
};

export default TableHeaderCell;
