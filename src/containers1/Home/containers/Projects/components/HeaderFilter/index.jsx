import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	Popover,
	Checkbox,
} from '@blueprintjs/core';
import { TransactionTypeIcon } from 'components/Icons';
import { createStructuredSelector } from 'reselect';
import {
	makeSelectFilterType,
	makeSelectFilterDate,
} from '../../store/selectors';
import {
	changeFilter,
	changeFilterDateRange,
} from '../../store/actions';
import DatePickerRange from '../../../../components/DatePickerRange';

const HeaderFilter = (props) => {
	const {
		type,
		date,
	} = props;

	const [typeIsOpen, setTypeIsOpen] = React.useState(false);
	const typeLabel = type === 1 ? 'Income' : type === 2 ? 'Outcome' : 'All';

	const incomeChange = () => props.changeFilter('type', type === 1 ? null : 1);

	const outcomeChange = () => props.changeFilter('type', type === 2 ? null : 2);

	return (
		<>
			<DatePickerRange
				date={date}
				changeFilterDateRange={props.changeFilterDateRange}
			/>
			<div className={'hf-item'}>
				<TransactionTypeIcon />
				<b>Type</b>
				<Popover
					isOpen={typeIsOpen}
					onClose={() => setTypeIsOpen(false)}
					boundary={'viewport'}
					position={'auto-start'}
				>
					<button type={'button'} onClick={() => setTypeIsOpen(true)}>{typeLabel}</button>
					<div className={'hf-popover'}>
						<Checkbox
							label={'Income'}
							checked={type === 1}
							onChange={incomeChange}
						/>
						<Checkbox
							label={'Outcome'}
							checked={type === 2}
							onChange={outcomeChange}
						/>
					</div>
				</Popover>
			</div>
		</>
	);
};

HeaderFilter.propTypes = {
	type: PropTypes.number,
	date: PropTypes.shape({
		from: PropTypes.any,
		to: PropTypes.any,
	}),
	changeFilterDateRange: PropTypes.func.isRequired,
	changeFilter: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
	type: makeSelectFilterType(),
	date: makeSelectFilterDate(),
});

const mapDispatchToProps = {
	changeFilter,
	changeFilterDateRange,
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(HeaderFilter));
