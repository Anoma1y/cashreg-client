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

		if (item.children.length === 0) {
			return (
				<MenuItem
					active={parseInt(input.value) === item.id}
					// active={modifiers.active}
					key={item.id}
					onClick={() => handleClick(item.id)}
					text={item.name}
				/>
			);
		}

		return (
			<div key={item.id}>
				<MenuItem
					// active={modifiers.active}
					disabled
					text={item.name}
				/>
				{item.children.map(child => (
					<MenuItem
						// active={modifiers.active}
						active={parseInt(input.value) === child.id}
						key={child.id}
						onClick={() => handleClick(child.id)}
						text={child.name}
						style={{ paddingLeft: 20 }}
					/>
				))}
			</div>
		)
	};

	const handleItemSelect = (item, id) => {
		input.onChange(id);
	};

	// const areItemEqual = (item, query) => item[labelKey].toLowerCase().includes(query.toLowerCase());

	// const handleQueryChange = query => {
	// 	if (query === '') {
	// 		return setItems(data);
	// 	}
	//
	// 	return setItems(data.filter(item => areItemEqual(item, query)));
	// };

	const id = parseInt(input.value);
	const dataLen = data.length;
	let currentItem = null;

	for (let i = 0; i < dataLen; i++) {
		const dataItem = data[i];
		const dataChildrenLen = dataItem.children.length;

		if (dataItem.id === id) {
			currentItem = dataItem;
			break;
		}

		for (let j = 0; j < dataChildrenLen; j++) {
			const dataChildItem = dataItem.children[j];

			if (dataChildItem.id === id) {
				currentItem = dataChildItem;
				break;
			}
		}
	}

	return (
		<Select
			filterable
			items={data}
			itemRenderer={(item, rest) => renderItem(item, rest)}
			// onQueryChange={handleQueryChange}
			noResults={<MenuItem disabled text="No results." />}
			onItemSelect={handleItemSelect}
		>
			<Button
				rightIcon="caret-down"
				text={currentItem ? currentItem[labelKey] : '(No selection)'}
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
