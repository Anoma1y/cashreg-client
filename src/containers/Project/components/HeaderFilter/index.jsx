import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	Popover,
	Checkbox,
} from '@blueprintjs/core';
import { TransactionTypeIcon } from 'components/Icons';
import { createStructuredSelector } from 'reselect';
import HeaderFilterDate from 'components/HeaderFilterDate';
import { useLoading, useDebounce } from 'hooks';
import {
	makeSelectFilterStatus,
	makeSelectFilterDate,
} from '../../store/selectors';
import {
	changeFilterDateRange,
	pullProjectData,
	applyAndSetProjectFilter,
} from '../../store/actions';

const HeaderFilter = (props) => {
	const {
		status,
		date,
	} = props;

	const [statusIsOpen, setStatusIsOpen] = React.useState(false);
	const [isLoading, load] = useLoading();

	const [, cancel] = useDebounce(() => {
		load(props.pullProjectData());
	}, 1000, [date.from, date.to]);

	useEffect(() => {
		cancel();
	}, []);


	const statusLabel = status === 1 ? 'Active' : status === 2 ? 'Archive' : 'All';

	const activeChange = () => props.applyAndSetProjectFilter('status', status === 1 ? null : 1);

	const achiveChange = () => props.applyAndSetProjectFilter('status', status === 2 ? null : 2);

	const handleChangeDate = (range) => {
		props.changeFilterDateRange(range[0], range[1]);
	};

	return (
		<>
			<HeaderFilterDate
				date={date}
				disabled={isLoading}
				title={'Activity date'}
				onChange={handleChangeDate}
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
							disabled={isLoading}
							checked={status === 1}
							onChange={activeChange}
						/>
						<Checkbox
							label={'Archive'}
							disabled={isLoading}
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
	applyAndSetProjectFilter: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
	status: makeSelectFilterStatus(),
	date: makeSelectFilterDate(),
});

const mapDispatchToProps = {
	applyAndSetProjectFilter,
	pullProjectData,
	changeFilterDateRange,
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(HeaderFilter));
