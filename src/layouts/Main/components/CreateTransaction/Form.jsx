import React, { memo, useState, useEffect } from 'react';
import cx from 'classnames';
import { reduxForm, Field, change as changeField } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Classes } from '@blueprintjs/core';
import { createStructuredSelector } from 'reselect';
import { makeSelectCategory } from 'containers/Category/store/selectors';
import { makeSelectContragent } from 'containers/Contragent/store/selectors';
import { makeSelectProject } from 'containers/Project/store/selectors';
import { makeSelectCurrency } from 'layouts/Main/store/selectors';
import { createTransaction } from '../../store/actions';
import { getUnixTime } from 'date-fns';

import DateField from 'components/Fields/DateField';
import NumberField from 'components/Fields/NumberField';
import TextAreaField from 'components/Fields/TextAreaField';

import Select from './Select';
import './index.scss';

import Validator from 'validator';

const validate = values => {
	const errors = {};

	if (values.comment && !Validator.isLength(values.comment, { max: 1000 })) {
		errors.comment = 'Max length is 1000 characters.';
	}

	return errors;
};

const CreateTransactionForm = (props) => {
	const [transactionType, setTransactionType] = useState('2');

	const changeTransactionType = e => {
		setTransactionType(e.target.value);
		props.changeField('transaction', 'category', null);
	};

	return (
		<>
			<div className={'transaction-create-header'}>
				<div className={'transaction-create_title'}>
					<h1>Create transaction</h1>
				</div>

				<div className="transaction-labels">
					<div className={'transaction-labels-group'}>
						<input
							type="radio"
							value={'2'}
							checked={transactionType === '2'}
							id={'income'}
							onChange={changeTransactionType}
						/>
						<label className={'positive'} htmlFor={'income'}>Income</label>
					</div>

					<div className={'transaction-labels-group'}>
						<input
							type="radio"
							value={'1'}
							id={'outcome'}
							checked={transactionType === '1'}
							onChange={changeTransactionType}
						/>
						<label className={'negative'} htmlFor={'outcome'}>Outcome</label>
					</div>
				</div>
			</div>

			<div className={`${Classes.DRAWER_BODY} transaction-body`}>
				<div className="transaction-group">
					<label>The date of payment</label>
					<div className={'transaction-group_input'}>
						<Field
							name={'registered_at'}
							component={DateField}
						/>
					</div>
				</div>

				<div className="transaction-group">
					<label>Sum</label>
					<div className={'transaction-group_input'}>
						<Field
							name={'sum'}
							placeholder={'0.00'}
							component={NumberField}
						/>
					</div>
				</div>

				<div className="transaction-group">
					<label>Currency</label>
					<div className={'transaction-group_input'}>
						<Field
							name={'currency'}
							component={Select} // todo plain select
							data={props.currency}
							labelKey={'name'}
						/>
					</div>
				</div>

				<div className="transaction-group">
					<label>Category</label>
					<div className={'transaction-group_input'}>
						<Field
							name={'category'}
							component={Select}
							data={props.category.filter(c => c.type === parseInt(transactionType))}
							hasNested
							labelKey={'name'}
							hasResetBtn
						/>
					</div>
				</div>

				<div className="transaction-group">
					<label>Contragent</label>
					<div className={'transaction-group_input'}>
						<Field
							name={'contragent'}
							component={Select}
							data={props.contragent}
							labelKey={'title'}
							hasResetBtn
						/>
					</div>
				</div>

				<div className="transaction-group">
					<label>Project</label>
					<div className={'transaction-group_input'}>
						<Field
							name={'project'}
							component={Select}
							data={props.project}
							labelKey={'title'}
							hasResetBtn
						/>
					</div>
				</div>

				<div className="transaction-group">
					<label>Description</label>
					<div className={'transaction-group_input'}>
						<Field
							name={'comment'}
							component={TextAreaField}
						/>
					</div>
				</div>

			</div>
			<div className={Classes.DRAWER_FOOTER}>
				<div className={'transaction-create_actions'}>
					<button
						type={'button'}
						className={'transaction-create_btn'}
						onClick={props.closeDrawer}
					>Cancel
					</button>
					<button
						type={'button'}
						className={'transaction-create_btn transaction-create_btn__success'}
						onClick={() => props.createTransaction(transactionType)}
					>Create
					</button>
				</div>
			</div>
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	category: makeSelectCategory(),
	contragent: makeSelectContragent(),
	project: makeSelectProject(),
	currency: makeSelectCurrency(),
});

const mapDispatchToProps = {
	createTransaction,
	changeField,
};

export default reduxForm({
	form: 'transaction',
	initialValues: {
		registered_at: getUnixTime(new Date()),
		sum: '0',
		currency: 1,
	},
	validate,
	destroyOnUnmount: false,
})(connect(mapStateToProps, mapDispatchToProps)(memo(CreateTransactionForm)));
