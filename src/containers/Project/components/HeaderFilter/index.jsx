import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	Popover,
	Checkbox,
} from '@blueprintjs/core';
import { TransactionTypeIcon } from 'components/Icons';
import { createStructuredSelector } from 'reselect';
import HeaderFilterDate from 'components/HeaderFilterDate';
import {
	makeSelectFilterStatus,
	makeSelectFilterDate,
} from '../../store/selectors';
import {
	changeFilter,
	changeFilterDateRange,
} from '../../store/actions';

const HeaderFilter = (props) => {
	const {
		status,
		date,
	} = props;

	const [statusIsOpen, setStatusIsOpen] = React.useState(false);
	const statusLabel = status === 1 ? 'Active' : status === 2 ? 'Archive' : 'All';

	const activeChange = () => props.changeFilter('status', status === 1 ? null : 1);

	const achiveChange = () => props.changeFilter('status', status === 2 ? null : 2);

	return (
		<>
			<HeaderFilterDate
				date={date}
				title={'Activity date'}
				changeFilterDateRange={props.changeFilterDateRange}
			/>
			<div className={'hf-item'}>
				<TransactionTypeIcon />
				<b>Status</b>
				<Popover
					isOpen={statusIsOpen}
					onClose={() => setStatusIsOpen(false)}
					boundary={'viewport'}
					position={'auto-start'}
				>
					<button type={'button'} onClick={() => setStatusIsOpen(true)}>{statusLabel}</button>
					<div className={'hf-popover'}>
						<Checkbox
							label={'Active'}
							checked={status === 1}
							onChange={activeChange}
						/>
						<Checkbox
							label={'Archive'}
							checked={status === 2}
							onChange={achiveChange}
						/>
					</div>
				</Popover>
			</div>
		</>
	);
};

HeaderFilter.propTypes = {
	status: PropTypes.number,
	date: PropTypes.shape({
		from: PropTypes.any,
		to: PropTypes.any,
	}),
	changeFilterDateRange: PropTypes.func.isRequired,
	changeFilter: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
	status: makeSelectFilterStatus(),
	date: makeSelectFilterDate(),
});

const mapDispatchToProps = {
	changeFilter,
	changeFilterDateRange,
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(HeaderFilter));
