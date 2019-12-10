import React, { memo } from 'react';
import { connect } from 'react-redux';
import Table from 'components/Table';
import { createStructuredSelector } from 'reselect';
import history from 'store/history';
import { url } from 'utils/constants';
import PropTypes from 'prop-types';
import { makeSelectFormattedProject } from '../../store/selectors';

const ProjectList = ({ project }) => {

	const goToSingle = id => {
		history.push(`${url.home.project.single}/${id}`);
	};

	const renderItem = item => (
		<Table.Row key={item.id} onClick={() => goToSingle(item.id)}>
			<Table.Cell>{item.title}</Table.Cell>
			<Table.Cell>{item.formated_date.start}</Table.Cell>
			<Table.Cell>{item.formated_date.end}</Table.Cell>
			<Table.Cell>{item.contragent.title}</Table.Cell>
			<Table.Cell>{item.status}</Table.Cell>
		</Table.Row>
	);

	return (
		<Table>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Title</Table.HeaderCell>
					<Table.HeaderCell>Start Date</Table.HeaderCell>
					<Table.HeaderCell>End Date</Table.HeaderCell>
					<Table.HeaderCell>Contragent</Table.HeaderCell>
					<Table.HeaderCell>Status</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{project.map(renderItem)}
			</Table.Body>
		</Table>
	);
};

ProjectList.propTypes = {
	project: PropTypes.array.isRequired, // todo add options
};

const mapStateToProps = createStructuredSelector({
	project: makeSelectFormattedProject(),
});

export default connect(mapStateToProps)(memo(ProjectList));
