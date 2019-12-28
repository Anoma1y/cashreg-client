import React, { memo } from 'react';
import { connect } from 'react-redux';
import Table from 'components/Table';
import { createStructuredSelector } from 'reselect';
import history from 'store/history';
import { url } from 'utils/constants';
import PropTypes from 'prop-types';
import { setOrder } from '../../store/actions';
import { makeSelectFormattedProject, makeSelectProjectOrder } from '../../store/selectors';

const tableHeader = [
	{ key: 'id', label: 'ID', sortable: true },
	{ key: 'title', label: 'Title', sortable: false },
	{ key: 'contragent', label: 'Contragent', sortable: true },
	{ key: 'start_date', label: 'Start Date', sortable: true },
	{ key: 'end_date', label: 'End Date', sortable: true },
	{ key: 'status', label: 'Status', sortable: true },
];

function ProjectList(props) {
	const { project, order } = props;

	const goToSingle = id => {
		history.push(`${url.home.project.single}/${id}`);
	};

	const renderItem = item => (
		<Table.Row key={item.id} onClick={() => goToSingle(item.id)}>
			<Table.Cell>{item.id}</Table.Cell>
			<Table.Cell>{item.title}</Table.Cell>
			<Table.Cell>{item.contragent.title}</Table.Cell>
			<Table.Cell>{item.formated_date.start}</Table.Cell>
			<Table.Cell>{item.formated_date.end}</Table.Cell>
			<Table.Cell>{item.status}</Table.Cell>
		</Table.Row>
	);

	const handleSort = (order) => {
		console.log(order)
		props.setOrder(order);
	};

	return (
		<Table>
			<Table.Header
				dataRow={tableHeader}
				onChangeSort={handleSort}
				order={order}
			/>
			<Table.Body>
				{project.map(renderItem)}
			</Table.Body>
		</Table>
	);
}

ProjectList.propTypes = {
	project: PropTypes.array.isRequired, // todo add options
	order: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
	project: makeSelectFormattedProject(),
	order: makeSelectProjectOrder(),
});

const mapDispatchToProps = {
	setOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(ProjectList));
