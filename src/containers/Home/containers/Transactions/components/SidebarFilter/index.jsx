import React, { memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCategories } from '../../store/selectors';
import { DateRangeInput } from '@blueprintjs/datetime';
import { format } from 'date-fns';
import { MenuItem } from '@blueprintjs/core';
import { MultiSelect } from '@blueprintjs/select';

const SidebarFilter = ({ categories }) => {
	const renderItem = (item) => (
		<MenuItem
			key={item.id}
			label={item.name}
			text={item.name}
			shouldDismissPopover={false}
		/>
	);

	const renderTag = item => item.name;

	return (
		<div>
			<div className={'filter-item'}>
				<p className="filter-item_label">Category</p>
				<MultiSelect
					items={categories}
					itemRenderer={renderItem}
					tagRenderer={renderTag}
				/>
			</div>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	categories: makeSelectCategories(),
});

export default connect(mapStateToProps)(memo(SidebarFilter));
