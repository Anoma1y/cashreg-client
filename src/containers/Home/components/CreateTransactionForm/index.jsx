import React, { memo, useState, useEffect } from 'react';
import cx from 'classnames';
import { reduxForm, Field } from 'redux-form';
import { Button, Classes, MenuItem } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
// import { Select } from '@blueprintjs/select';
import Select from 'containers/Home/containers/Transactions/components/Select'; // todo go to up
import './index.scss';

const items = [
	{id: 1, name: 'First'},
	{id: 2, name: 'Second'},
	{id: 3, name: 'Third'},
];

// const SelectHui = (props) => {
// 	const {
// 		input,
// 	} = props;
// 	const [query, setQuery] = useState('')
//
// 	const renderItem = (item, { handleClick, modifiers }) => {
// 		if (!modifiers.matchesPredicate) {
// 			return null;
// 		}
//
// 		return (
// 			<MenuItem
// 				active={modifiers.active}
// 				key={item.id}
// 				onClick={handleClick}
// 				text={item.name}
// 			/>
// 		);
// 	};
//
// 	const handleSelectChange = (item) => {
// 		input.onChange(item.id)
// 	};
//
// 	const filterItems = (query, item) => {
// 		console.log(query, item)
// 		return item.name.toLowerCase().indexOf(query.toLowerCase()) >= 0;
// 	};
//
// 	const handleQueryChange = query => {
// 		setQuery(query)
// 		// if (query === '') {
// 		// 	return setItems(data);
// 		// }
// 		//
// 		// return setItems(data.filter(item => areItemEqual(item, query)));
// 	};
//
// 	return (
// 		<Select
// 			filterable
// 			items={props.items}
// 			itemRenderer={renderItem}
// 			// onQueryChange={handleQueryChange}
// 			noResults={<MenuItem disabled text="No results." />}
// 			onItemSelect={handleSelectChange}
// 		>
// 			<Button
// 				rightIcon="caret-down"
// 				text={input.value ? items.find(a => a.id === parseInt(input.value)).name : '(No selection)'}
// 			/>
// 		</Select>
// 	)
// }

const CreateTransactionForm = () => {
	return (
		<>
			<div className={Classes.DRAWER_HEADER}>
				<div className="transaction-labels">
					<div>
						<input type="radio" name={'type'} value={'income'} id={'income'} />
						<label className={'positive'} htmlFor={'income'}>Income</label>
					</div>

					<div>
						<input type="radio" name={'type'} value={'outcome'} id={'outcome'} />
						<label className={'negative'} htmlFor={'outcome'}>Outcome</label>
					</div>
				</div>
			</div>
			<div className={`${Classes.DRAWER_BODY} transaction-body`}>
				<div className="transaction-group">
					<label htmlFor="">The date of payment</label>
					<div className={'transaction-group_input'}>
						<DateInput
							formatDate={date => date.toLocaleString()}
							// onChange={this.handleDateChange}
							parseDate={str => new Date(str)}
							value={null}
						/>
					</div>
				</div>

				<div className="transaction-group">
					<label htmlFor="">Sum</label>
					<div className={'transaction-group_input'}>
						<Field name={'sum'} component={'input'} placeholder={'0'} />
					</div>
				</div>

				<div className="transaction-group">
					<label htmlFor="">Category</label>
					<div className={'transaction-group_input'}>
						<Field name={'category'} component={Select} data={items} labelKey={'name'} />
					</div>
				</div>

				<div className="transaction-group">
					<label htmlFor="">Contragent</label>
					<div className={'transaction-group_input'}>
						<Field name={'contragent'} component={'select'}>
						</Field>
					</div>
				</div>

				<div className="transaction-group">
					<label htmlFor="">Project</label>
					<div className={'transaction-group_input'}>
						<Field name={'project'} component={'select'}>
						</Field>
					</div>
				</div>

				<div className="transaction-group">
					<label htmlFor="">Description</label>
					<div className={'transaction-group_input'}>
						<Field name={'description'} component={'textarea'} placeholder={''} />
					</div>
				</div>

			</div>
			<div className={Classes.DRAWER_FOOTER}>
				<Button>Cancel</Button>
				<Button>Create</Button>
			</div>
		</>

	);
};

export default reduxForm({
	form: 'transaction',
	destroyOnUnmount: false,
})(memo(CreateTransactionForm));
