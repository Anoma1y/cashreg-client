import React, { memo, useContext, useState, useMemo } from 'react';
import { Drawer, Classes, Position } from '@blueprintjs/core';
import { Context } from 'containers/Home';
import CreateTransactionForm from '../CreateTransactionForm';

const CreateTransaction = () => {
	const { transactionIsOpen, setTransactionIsOpen } = useContext(Context);

	const closeDrawer = () => setTransactionIsOpen(false);

	return useMemo(
		() => (
			<Drawer
				icon="join-table"
				onClose={closeDrawer}
				title="Add transaction"
				autoFocus={true}
				canEscapeKeyClose={true}
				canOutsideClickClose={true}
				enforceFocus={true}
				hasBackdrop={true}
				isOpen={transactionIsOpen}
				position={Position.RIGHT}
				size={undefined}
				usePortal={true}
			>
				<div className={Classes.DRAWER_BODY}>
					<CreateTransactionForm />
				</div>
			</Drawer>
		),
		[transactionIsOpen],
	);
};

export default memo(CreateTransaction);
