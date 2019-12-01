import React, { memo, useState, useEffect } from 'react';
import cx from 'classnames';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Classes, MenuItem } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';
import { createStructuredSelector } from 'reselect';
import { makeSelectCategory } from 'containers/Category/store/selectors';
import { makeSelectContragent } from 'containers/Contragent/store/selectors';
import { makeSelectProject } from 'containers/Project/store/selectors';

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
				{/*<div className="transaction-group">*/}
				{/*	<label htmlFor="">The date of payment</label>*/}
				{/*	<div className={'transaction-group_input'}>*/}
				{/*		<DateInput*/}
				{/*			formatDate={date => date.toLocaleString()}*/}
				{/*			// onChange={this.handleDateChange}*/}
				{/*			parseDate={str => new Date(str)}*/}
				{/*			value={null}*/}
				{/*		/>*/}
				{/*	</div>*/}
				{/*</div>*/}

				<Field
					name={'sum'}
					label={'Sum'}
					placeholder={'Sum'}
					component={NumberField}
				/>

				{/*<div className="transaction-group">*/}
				{/*	<label htmlFor="">Sum</label>*/}
				{/*	<div className={'transaction-group_input'}>*/}
				{/*		<Field name={'sum'} component={NumberFormatCustom} />*/}
				{/*	</div>*/}
				{/*</div>*/}

				{/*<div className="transaction-group">*/}
				{/*	<label htmlFor="">Category</label>*/}
				{/*	<div className={'transaction-group_input'}>*/}
				{/*		<Field*/}
				{/*			name={'category'}*/}
				{/*			component={Select}*/}
				{/*			data={props.category}*/}
				{/*			hasNested*/}
				{/*			labelKey={'name'}*/}
				{/*		/>*/}
				{/*	</div>*/}
				{/*</div>*/}

				{/*<div className="transaction-group">*/}
				{/*	<label htmlFor="">Contragent</label>*/}
				{/*	<div className={'transaction-group_input'}>*/}
				{/*		<Field*/}
				{/*			name={'contragent'}*/}
				{/*			component={Select}*/}
				{/*			data={props.contragent}*/}
				{/*			labelKey={'title'}*/}
				{/*		/>*/}
				{/*	</div>*/}
				{/*</div>*/}

				{/*<div className="transaction-group">*/}
				{/*	<label htmlFor="">Project</label>*/}
				{/*	<div className={'transaction-group_input'}>*/}
				{/*		<Field*/}
				{/*			name={'project'}*/}
				{/*			component={Select}*/}
				{/*			data={props.project}*/}
				{/*			labelKey={'title'}*/}
				{/*		/>*/}
				{/*	</div>*/}
				{/*</div>*/}

				<Field
					name={'description'}
					component={TextAreaField}
					label={'Description'}
					placeholder={'Description'}
				/>


				{/*<div className="transaction-group">*/}
				{/*	<label htmlFor="">Description</label>*/}
				{/*	<div className={'transaction-group_input'}>*/}
				{/*		<Field name={'description'} component={'textarea'} placeholder={''} />*/}
				{/*	</div>*/}
				{/*</div>*/}

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
	destroyOnUnmount: false,
})(connect(mapStateToProps)(memo(CreateTransactionForm)));
