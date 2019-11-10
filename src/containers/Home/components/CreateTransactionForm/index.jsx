import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { changeTransaction } from '../../store/actions';

const CreateTransactionForm = ({ transaction, changeTransaction }) => {
	return (
		<div>
			<input type="text" value={transaction.sum} onChange={e => changeTransaction('sum', e.target.value)}/>
			<input type="text" value={transaction.description} onChange={e => changeTransaction('description', e.target.value)}/>
		</div>
	)
};
const mapStateToProps = ({ home }) => ({
	transaction: home.transaction,
})

const mapDispatchToProps = {
	changeTransaction,
}


export default connect(mapStateToProps, mapDispatchToProps)(memo(CreateTransactionForm));
