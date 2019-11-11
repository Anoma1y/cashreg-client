import React, { memo, useState, useEffect } from 'react';
import { reduxForm, Field } from 'redux-form';

const CreateTransactionForm = () => {
	// console.log(transaction)
	return (
		<div>

		</div>
	)
};

export default reduxForm({
	form: 'transaction',
	destroyOnUnmount: false,
})(memo(CreateTransactionForm))
