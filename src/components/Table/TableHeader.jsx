import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { useKeyOnly, getUnhandledProps } from 'utils/ui';
import TableHeaderCell from './TableHeaderCell';
import TableRow from './TableRow';

function getNewOrder(oldOrder, key) {
	const newOrder = { ...oldOrder };
	const direct = oldOrder[key];

	if (!direct) {
		newOrder[key] = 'desc';
	} else if (direct === 'desc') {
		newOrder[key] = 'asc';
	} else {
		delete newOrder[key];
	}

	return newOrder;
}

const TableHeader = props => {
	const { children, className, fullwidth, order, dataRow, onChangeSort } = props;

	const classes = cx(useKeyOnly(fullwidth, 'full-width'), className);

	if (dataRow.length !== 0) {
		return (
			<thead className={classes}>
				<TableRow>
					{dataRow.map((row) => {
						const sortableProps = {};

						if (row.sortable) {
							sortableProps.onClick = () => onChangeSort(getNewOrder(order, row.key));
						}

						return (
							<TableHeaderCell
								key={row.key}
								{...sortableProps}
							>
								{row.label}
							</TableHeaderCell>
						);
					})}
				</TableRow>
			</thead>
		);
	}

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
	onChangeSort: PropTypes.func,
	order: PropTypes.object,
	dataRow: PropTypes.arrayOf(PropTypes.shape({
		key: PropTypes.string,
		label: PropTypes.string,
		sortable: PropTypes.bool,
	})),
};

export default TableHeader;
