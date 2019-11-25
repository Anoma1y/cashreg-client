import React from 'react';
import cx from 'classnames';
import { useKeyOnly } from 'utils/ui';
import './index.scss';

const Filter = ({ children, isOpen }) => {
	const classes = cx(
		'filter',
		'filter-wrapper',
		useKeyOnly(!isOpen, 'filter__collapsed'),
	);

	return (
		<div className={classes}>
			<div className={'filter-content'}>
				{children}
			</div>
		</div>
	);
};

export default Filter;
