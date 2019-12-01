import React from 'react';
import Table from 'components/Table';

const TransactionList = () => (
	<div className={'transactions-list'}>
		<Table>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell></Table.HeaderCell>
					<Table.HeaderCell>ID</Table.HeaderCell>
					<Table.HeaderCell>Date & Time</Table.HeaderCell>
					<Table.HeaderCell>Category</Table.HeaderCell>
					<Table.HeaderCell>Contragent</Table.HeaderCell>
					<Table.HeaderCell>Project</Table.HeaderCell>
					<Table.HeaderCell>Sum</Table.HeaderCell>
					<Table.HeaderCell>Status</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<Table.Row>
					<Table.Cell></Table.Cell>
					<Table.Cell>1</Table.Cell>
					<Table.Cell>27 Apr. 2019</Table.Cell>
					<Table.Cell>Buy dildo</Table.Cell>
					<Table.Cell>OOO Moya Oborona</Table.Cell>
					<Table.Cell>Havar</Table.Cell>
					<Table.Cell positive>7 878 554.00 $</Table.Cell>
					<Table.Cell>Approved</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell></Table.Cell>
					<Table.Cell>34</Table.Cell>
					<Table.Cell>27 Apr. 2019</Table.Cell>
					<Table.Cell>Buy dildo</Table.Cell>
					<Table.Cell>OOO Moya Oborona</Table.Cell>
					<Table.Cell>Havar</Table.Cell>
					<Table.Cell negative>7 878 554.00 $</Table.Cell>
					<Table.Cell>Approved</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table>
	</div>
);

export default TransactionList;
