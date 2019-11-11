import React from 'react';
import cx from 'classnames';
import { useKeyOnly } from 'utils/ui';
import './index.scss';

const Table = props => {
	const {
		children,
		disabled,
		collapsing = true,
		striped = true,
		className,
	} = props;

	const classes = cx(
		useKeyOnly(disabled, 'disabled'),
		useKeyOnly(collapsing, 'collapsing'),
		useKeyOnly(striped, 'striped'),
		'table',
		className,
	);

	return (
		<table className={classes}>
			{children}
		</table>
	);
};

export default Table;
