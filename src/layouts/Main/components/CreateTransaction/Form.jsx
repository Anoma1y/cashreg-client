import React, { memo, useState, useEffect } from 'react';
import cx from 'classnames';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Classes } from '@blueprintjs/core';
import { createStructuredSelector } from 'reselect';
import { makeSelectCategory } from 'containers/Category/store/selectors';
import { makeSelectContragent } from 'containers/Contragent/store/selectors';
import { makeSelectProject } from 'containers/Project/store/selectors';
import { getUnixTime } from 'date-fns';

import DateField from 'components/Fields/DateField';
import NumberField from 'components/Fields/NumberField';
import TextAreaField from 'components/Fields/TextAreaField';

import Select from './Select';
import './index.scss';

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
							component={NumberField}
						/>
					</div>
				</div>

				<div className="transaction-group">
					<label>Category</label>
					<div className={'transaction-group_input'}>
						<Field
							name={'category'}
							component={Select}
							data={props.category}
							hasNested
							labelKey={'name'}
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
						/>
					</div>
				</div>

				<div className="transaction-group">
					<label>Description</label>
					<div className={'transaction-group_input'}>
						<Field
							name={'description'}
							component={TextAreaField}
						/>
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
	category: makeSelectCategory(),
	contragent: makeSelectContragent(),
	project: makeSelectProject(),
});

export default reduxForm({
	form: 'transaction',
	initialValues: {
		registered_at: getUnixTime(new Date()),
	},
	destroyOnUnmount: false,
})(connect(mapStateToProps)(memo(CreateTransactionForm)));
