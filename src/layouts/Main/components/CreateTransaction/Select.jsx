import React, { useState, memo } from 'react';
import { Select } from '@blueprintjs/select';
import { MenuItem, Button } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import { ArrowIcon } from 'components/Icons';

const getCurrentChildrenItem = (data, id) => {
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

	return currentItem;
};

const getCurrentItem = (data, id) => data.find(item => item.id === id);

const areItemEqual = (item, query) => item.toLowerCase().includes(query.toLowerCase());

const findItems = (data, query, labelKey) => data.filter((item) => areItemEqual(item[labelKey], query));

const findChildrenItems = (data, query, labelKey) => {
	const items = [];

	data.forEach(dataItem => {
		const obj = { ...dataItem };
		delete obj['children']

		dataItem.children.forEach(dataChildItem => {
			if (areItemEqual(dataChildItem[labelKey], query)) {
				items.push(dataChildItem);
			}
		});

		if (areItemEqual(dataItem[labelKey], query)) {
			items.push(obj);
		}
	});

	return items;
};

const SelectComponent = props => {
	const {
		data = [],
		input,
		labelKey = 'name',
		hasNested = false,
	} = props;

	const [items, setItems] = useState(data);

	const renderItem = (item, { modifiers, handleClick }) => {
		if (!modifiers.matchesPredicate) {
			return null;
		}

		if (!item.children || item.children.length === 0) {
			return (
				<MenuItem
					active={parseInt(input.value) === item.id}
					key={item.id}
					onClick={() => handleClick(item.id)}
					text={item[labelKey]}
				/>
			);
		}

		return (
			<div key={item.id}>
				<MenuItem
					disabled
					text={item[labelKey]}
				/>
				{item.children.map(child => (
					<MenuItem
						active={parseInt(input.value) === child.id}
						key={child.id}
						onClick={() => handleClick(child.id)}
						text={child.name}
						style={{ paddingLeft: 20 }}
					/>
				))}
			</div>
		);
	};

	const handleItemSelect = (item, id) => {
		input.onChange(id);
	};

	const id = parseInt(input.value);
	const currentItem = hasNested ? getCurrentChildrenItem(data, id) : getCurrentItem(data, id);

	const handleQueryChange = query => {
		if (query === '') {
			return setItems(data);
		}

		return setItems(hasNested ? findChildrenItems(data, query, labelKey) : findItems(data, query, labelKey));
	};

	return (
		<div className={'form-group'}>
			<Select
				className={'form_extended-select'}
				filterable
				items={items}
				itemRenderer={(item, rest) => renderItem(item, rest)}
				onQueryChange={handleQueryChange}
				noResults={<MenuItem disabled text="No results." />}
				onItemSelect={handleItemSelect}
			>
				<button type={'button'}>
					<span>{currentItem ? currentItem[labelKey] : '(No selection)'}</span>
					<ArrowIcon />
				</button>
			</Select>
		</div>
	);
};

SelectComponent.propTypes = {
	data: PropTypes.array.isRequired,
	input: PropTypes.any.isRequired,
	labelKey: PropTypes.string,
	hasNested: PropTypes.bool,
};

export default memo(SelectComponent);
