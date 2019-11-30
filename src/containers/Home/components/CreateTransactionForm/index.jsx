import React, { memo, useState, useEffect } from 'react';
import cx from 'classnames';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Classes, MenuItem } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
import { createStructuredSelector } from 'reselect';
import { makeSelectCategories } from 'containers/Home/containers/Categories/store/selectors';

import Select from 'containers/Home/containers/Transactions/components/Select'; // todo go to up
import './index.scss';

const items = [
	{id: 1, name: 'First'},
	{id: 2, name: 'Second'},
	{id: 3, name: 'Third'},
];

const CreateTransactionForm = (props) => {
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
						<Field
							name={'category'}
							component={Select}
							data={props.categories}
							labelKey={'name'}
						/>
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

const mapStateToProps = createStructuredSelector({
	categories: makeSelectCategories(),
});

export default reduxForm({
	form: 'transaction',
	destroyOnUnmount: false,
})(connect(mapStateToProps)(memo(CreateTransactionForm)));
