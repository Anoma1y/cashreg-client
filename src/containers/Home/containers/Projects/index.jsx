import React from 'react';
import Table from 'components/Table';

const mockData = [
	{ id: 1, title: 'Anus developming', first_transaction: '29.08.2019', last_transaction: '11.11.2019', income: '+578 444.00', outcome: '- 78 444.00', differenceSum: '+424 222', differencePer: '+78.22' },
	{ id: 2, title: 'Anus developming', first_transaction: '29.08.2019', last_transaction: '11.11.2019', income: '+578 444.00', outcome: '- 78 444.00', differenceSum: '+424 222', differencePer: '+78.22' },
	{ id: 3, title: 'Anus developming', first_transaction: '29.08.2019', last_transaction: '11.11.2019', income: '+578 444.00', outcome: '- 78 444.00', differenceSum: '+424 222', differencePer: '+78.22' },
	{ id: 4, title: 'Anus developming', first_transaction: '29.08.2019', last_transaction: '11.11.2019', income: '+578 444.00', outcome: '- 78 444.00', differenceSum: '+424 222', differencePer: '+78.22' },
	{ id: 5, title: 'Anus developming', first_transaction: '29.08.2019', last_transaction: '11.11.2019', income: '+578 444.00', outcome: '- 78 444.00', differenceSum: '+424 222', differencePer: '+78.22' },
];

const Projects = () => (
	<div>
		<Table>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Title</Table.HeaderCell>
					<Table.HeaderCell>First transaction</Table.HeaderCell>
					<Table.HeaderCell>Last transaction</Table.HeaderCell>
					<Table.HeaderCell>Income, RUB</Table.HeaderCell>
					<Table.HeaderCell>Outcome, RUB</Table.HeaderCell>
					<Table.HeaderCell>Difference, RUB</Table.HeaderCell>
					<Table.HeaderCell>Difference, %</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{mockData.map(d => (
					<Table.Row key={d.id}>
						<Table.Cell>{d.title}</Table.Cell>
						<Table.Cell>{d.first_transaction}</Table.Cell>
						<Table.Cell>{d.last_transaction}</Table.Cell>
						<Table.Cell>{d.income}</Table.Cell>
						<Table.Cell>{d.outcome}</Table.Cell>
						<Table.Cell>{d.differenceSum}</Table.Cell>
						<Table.Cell>{d.differencePer}</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	</div>
);

export default Projects;
