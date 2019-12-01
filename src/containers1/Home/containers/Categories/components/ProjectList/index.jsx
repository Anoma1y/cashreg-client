import React, { memo } from 'react';
import { connect } from 'react-redux';
import Table from 'components/Table';
import { createStructuredSelector } from 'reselect';
import { makeSelectProjects } from '../../store/selectors';
import { format as formatDate } from 'date-fns';

const ProjectList = ({ projects }) => {
	return (
		<Table>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Title</Table.HeaderCell>
					<Table.HeaderCell>Date</Table.HeaderCell>
					<Table.HeaderCell>Contragent</Table.HeaderCell>
					<Table.HeaderCell>Status</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{projects.map(project => (
					<Table.Row key={project.id}>
						<Table.Cell>{project.title}</Table.Cell>
						<Table.Cell>{project.start_date_formatted} - {project.end_date_formatted}</Table.Cell>
						<Table.Cell>{project.contragent_title}</Table.Cell>
						<Table.Cell>{project.status}</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
};

const mapStateToProps = createStructuredSelector({
	projects: makeSelectProjects(),
});

export default connect(mapStateToProps)(memo(ProjectList));
