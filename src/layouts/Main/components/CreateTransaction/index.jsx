import React, { memo, useContext, useState, useMemo } from 'react';
import { Button, Drawer, Classes, Position } from '@blueprintjs/core';
import { Context } from 'layouts/Main';
import CreateTransactionForm from './Form';
import './index.scss';

const CreateTransaction = () => {
	const { transactionIsOpen, setTransactionIsOpen } = useContext(Context);

	const closeDrawer = () => setTransactionIsOpen(false);

	return useMemo(
		() => (
			<Drawer
				autoFocus
				canEscapeKeyClose
				canOutsideClickClose
				enforceFocus={false} // fix suggest select focus
				hasBackdrop
				usePortal
				icon={'join-table'}
				title={'Add transaction'}
				onClose={closeDrawer}
				isOpen
				// isOpen={transactionIsOpen}
				position={Position.RIGHT}
				size={undefined}
			>
				<CreateTransactionForm />
			</Drawer>
		),
		[transactionIsOpen],
	);
};

export default memo(CreateTransaction);
