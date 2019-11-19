import React from 'react';
import { DateRangePicker } from '@blueprintjs/datetime';
import {
	Dialog,
	Popover,
	Checkbox,
	InputGroup,
} from '@blueprintjs/core';
import {
	CalendarIcon,
	TransactionTypeIcon,
	SearchIcon,
	FilterIcon,
} from 'components/Icons';
import './index.scss';

const HeaderFilter = ({ toggleFilterOpen }) => {
	const [isOpen, setIsOpen] = React.useState(false);
	const [isOpen1, setIsOpen1] = React.useState(false);

	const handleInputFocus = (e) => {
		e.target.parentNode.classList.add('focus');
	};

	const handleInputBlur = (e) => {
		e.target.parentNode.classList.remove('focus');
	};

	return (
		<>
			<div className={'header-filter'}>
				<div className="header-filter_col">
					<div className={'hf-item'}>
						<CalendarIcon />
						<b>Date</b>
						<button type={'button'} onClick={() => setIsOpen(true)}>Last week</button>
					</div>
					<div className={'hf-item'}>
						<TransactionTypeIcon />
						<b>Type</b>
						<Popover
							isOpen={isOpen1}
							onClose={() => setIsOpen1(false)}
							boundary={'viewport'}
							position={'auto'}
						>
							<button type={'button'} onClick={() => setIsOpen1(true)}>All</button>
							<div className={'hf-popover'}>
								<Checkbox label={'Income'} />
								<Checkbox label={'Outcome'} />
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
							placeholder={'Search...'}
						/>
						<SearchIcon />
					</div>
					<button type={'button'} className={'hf_btn'} onClick={toggleFilterOpen}><FilterIcon /></button>
				</div>
			</div>
			<Dialog
				isOpen={isOpen}
				className={'hf-modal'}
				onClose={() => setIsOpen(false)}
			>
				<DateRangePicker

				/>
			</Dialog>
		</>
	);
};

export default HeaderFilter;
