import React, { useState, memo } from 'react';
import { MultiSelect } from '@blueprintjs/select';
import { MenuItem, Button } from '@blueprintjs/core';
import PropTypes from 'prop-types';

const MultiSelectComponent = props => {
	const {
		data,
		selectItems,
		changeFilter,
		filterKey,
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
				key={item.id}
				icon={isItemSelected(item) ? 'tick' : 'blank'}
				active={modifiers.active}
				text={item[labelKey]}
				onClick={handleClick}
				shouldDismissPopover={false}
			/>
		)
	};

	const handleItemSelect = (item) => {
		if (!isItemSelected(item)) {
			changeFilter(filterKey, [...selectItems, item]);
		} else {
			changeFilter(filterKey, [...selectItems].filter(sc => sc.id !== item.id));
		}
	};

	const renderTag = item => item[labelKey];

	const handleClear = () => changeFilter(filterKey, []);

	const handleTagRemove = (item, index) => {
		changeFilter(filterKey, [...selectItems].filter((tag, i) => i !== index));
	};

	const clearButton = selectItems.length > 0 ? <Button icon="cross" minimal onClick={handleClear} /> : undefined;

	const areItemEqual = (item, query) => item[labelKey].toLowerCase().includes(query.toLowerCase());

	const handleQueryChange = query => {
		if (query === '') {
			return setItems(data);
		}

		return setItems(data.filter(item => areItemEqual(item, query)));
	};

	return (
		<MultiSelect
			fill
			resetOnSelect
			items={items}
			itemRenderer={renderItem}
			tagRenderer={renderTag}
			onQueryChange={handleQueryChange}
			noResults={<MenuItem disabled text="No results." />}
			selectedItems={selectItems}
			onItemSelect={handleItemSelect}
			placeholder={placeholder}
			tagInputProps={{ onRemove: handleTagRemove, rightElement: clearButton }}
		/>
	);
};

MultiSelectComponent.propTypes = {
	data: PropTypes.array.isRequired,
	selectItems: PropTypes.array.isRequired,
	changeFilter: PropTypes.func.isRequired,
	filterKey: PropTypes.string.isRequired,
	labelKey: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
};

export default memo(MultiSelectComponent);
