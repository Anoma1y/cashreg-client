import React, { memo, useState, useEffect } from 'react';
import { DateRangePicker } from '@blueprintjs/datetime';
import PropTypes from 'prop-types';
import { Dialog } from '@blueprintjs/core';
import { CalendarIcon } from 'components/Icons';
import './index.scss';
import { format as dateFormat } from 'date-fns';

const HeaderFilterDate = props => {
	const {
		date,
		title = 'Date',
		disabled,
		onChange,
	} = props;
	const [label, setLabel] = useState('Last month');
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (date.from && date.to) {
			setLabel(`${dateFormat(date.from, 'dd.MM.yyyy')} - ${dateFormat(date.to, 'dd.MM.yyyy')}`);
		} else if (!date.from && date.to) {
			setLabel(`Until ${dateFormat(date.to, 'dd.MM.yyyy')}`);
		} else if (date.from && !date.to) {
			setLabel(`Since ${dateFormat(date.from, 'dd.MM.yyyy')}`);
		}
	}, [date]);
	
	// const handleDateShortcatChange = shortcut => {
	// 	setLabel(shortcut.label);
	// };
	const handleOpen = () => {
		if (disabled) return;

		setIsOpen(true);
	}

	return (
		<>
			<div className={'hf-item'}>
				<CalendarIcon />
				<b>{title}</b>
				<button type={'button'} onClick={handleOpen}>{label}</button>
			</div>
			<Dialog
				isOpen={isOpen}
				className={'hf-modal'}
				onClose={() => setIsOpen(false)}
			>
				<DateRangePicker
					shortcuts
					allowSingleDayRange
					value={[date.from, date.to]}
					// onShortcutChange={handleDateShortcatChange}
					onChange={onChange}
				/>
			</Dialog>
		</>
	)
};

export default memo(HeaderFilterDate);
