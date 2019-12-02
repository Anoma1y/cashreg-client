import React, { memo, useState, useEffect } from 'react';
import { DateInput } from '@blueprintjs/datetime';
import { format, getUnixTime, fromUnixTime } from 'date-fns';

const DateField = (props) => {
	const {
		input,
		meta,
	} = props;

	const handleDateChange = date => {
		input.onChange(getUnixTime(date));
	};

	return (
		<div className={'form-group'}>
			<DateInput
				className={'form_datepicker'}
				formatDate={date => format(date, 'dd MMMM yyyy')}
				onChange={handleDateChange}
				parseDate={str => new Date(str)}
				timePrecision={'second'}
				highlightCurrentDay
				shortcuts
				canClearSelection={false}
				value={fromUnixTime(input.value)}
			/>
		</div>
	)
};

export default memo(DateField);
