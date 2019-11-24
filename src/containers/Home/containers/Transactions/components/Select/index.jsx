import React, { useState, memo } from 'react';
import { Select } from '@blueprintjs/select';
import { MenuItem, Button } from '@blueprintjs/core';
import PropTypes from 'prop-types';

const SelectComponent = props => {
	const {
		data,
		selectItems,
		changeFilter,
		input,
		labelKey,
		placeholder = null,
	} = props;

	const [items, setItems] = useState(data);

	const getSelectedItemIndex = item => selectItems.indexOf(item);

	const isItemSelected = item => getSelectedItemIndex(item) !== -1;

	const renderItem = (item, { modifiers, handleClick }) => {
		if (!modifiers.matchesPredicate) {
			return null;
		}

		return (
			<MenuItem
				active={modifiers.active}
				key={item.id}
				onClick={handleClick}
				text={item.name}
			/>
		)
	};

	const handleItemSelect = (item) => {
		input.onChange(item.id);
	};

	// const areItemEqual = (item, query) => item[labelKey].toLowerCase().includes(query.toLowerCase());

	// const handleQueryChange = query => {
	// 	if (query === '') {
	// 		return setItems(data);
	// 	}
	//
	// 	return setItems(data.filter(item => areItemEqual(item, query)));
	// };

	return (
		<Select
			filterable
			items={data}
			itemRenderer={renderItem}
			// onQueryChange={handleQueryChange}
			noResults={<MenuItem disabled text="No results." />}
			onItemSelect={handleItemSelect}
		>
			<Button
				rightIcon="caret-down"
				text={input.value ? data.find(a => a.id === parseInt(input.value))[labelKey] : '(No selection)'}
			/>
		</Select>
	);
};

SelectComponent.propTypes = {
	data: PropTypes.array.isRequired,
	// selectItems: PropTypes.array.isRequired,
	// changeFilter: PropTypes.func.isRequired,
	// filterKey: PropTypes.string.isRequired,
	// labelKey: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
};

export default memo(SelectComponent);
