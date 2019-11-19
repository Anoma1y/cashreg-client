import React, { memo } from 'react';
import { reduxForm, Field } from 'redux-form';
// import Checkbox from 'containers/Home/components/Field/Checkbox';
import { Checkbox, HTMLSelect } from '@blueprintjs/core';
import { DateRangeInput } from '@blueprintjs/datetime';
import { format } from 'date-fns';

const SidebarFilter = () => {
	return (
		<div>
			<div className={'filter-item'}>
				<p className="filter-item_label">Category</p>
				<Field name={'category'} component={HTMLSelect}>
					<option value="" />
					<option value="category-1">Buy dildo</option>
					<option value="category-1">Sell dildo</option>
				</Field>
			</div>
		</div>
	)
};

export default reduxForm({
	form: 'transaction-filter',
})(memo(SidebarFilter));
