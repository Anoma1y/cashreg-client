import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	Popover,
	Checkbox,
} from '@blueprintjs/core';
import {
	TransactionTypeIcon,
	SearchIcon,
	FilterIcon,
} from 'components/Icons';
import './index.scss';
import { createStructuredSelector } from 'reselect';
import { useDebounce } from 'hooks';
import {
	makeSelectFilterSearch,
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
		toggleFilterOpen,
		type,
		date,
		search,
	} = props;

	const [typeIsOpen, setTypeIsOpen] = React.useState(false);
	const typeLabel = type === 1 ? 'Income' : type === 2 ? 'Outcome' : 'All';

	const [, cancel] = useDebounce(() => {}, 500, [search]);

	React.useEffect(() => {
		cancel();
	}, []);

	const handleInputFocus = (e) => {
		e.target.parentNode.classList.add('focus');
	};

	const handleInputBlur = (e) => {
		if (e.target.value !== '') return;

		e.target.parentNode.classList.remove('focus');
	};

	const handleChangeSearch = (e) => {
		const { value } = e.target;

		props.changeFilter('search', value);
	};

	const incomeChange = () => props.changeFilter('type', type === 1 ? null : 1);

	const outcomeChange = () => props.changeFilter('type', type === 2 ? null : 2);

	return (
		<>
			<div className={'header-filter'}>
				<div className="header-filter_col">
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
				</div>
				<div className="header-filter_col">
					<div className={'hf_input'}>
						<input
							type="text"
							onFocus={handleInputFocus}
							onBlur={handleInputBlur}
							onChange={handleChangeSearch}
							placeholder={'Search...'}
						/>
						<SearchIcon />
					</div>
					<button type={'button'} className={'hf_btn'} onClick={toggleFilterOpen}><FilterIcon /></button>
				</div>
			</div>
		</>
	);
};

HeaderFilter.propTypes = {
	toggleFilterOpen: PropTypes.func.isRequired,
	type: PropTypes.number,
	date: PropTypes.shape({
		from: PropTypes.any,
		to: PropTypes.any,
	}),
	search: PropTypes.string.isRequired,
	changeFilterDateRange: PropTypes.func.isRequired,
	changeFilter: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
	search: makeSelectFilterSearch(),
	type: makeSelectFilterType(),
	date: makeSelectFilterDate(),
});

const mapDispatchToProps = {
	changeFilter,
	changeFilterDateRange,
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(HeaderFilter));
