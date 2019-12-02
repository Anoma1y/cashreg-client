import React, { useState } from 'react';
import cx from 'classnames';
import NumberFormat from 'react-number-format';

export default ({ input, id, label, helperText, meta: { touched, error }, ...custom }) => {
	const [active, setActive] = useState(false);
	const classes = cx(
		'form-group',
		active && 'active',
		error && 'error',
	);

	const handlePaste = event => {
		const text = event.clipboardData.getData('Text');
		const { target } = event;

		event.preventDefault();

		text
			.replace(/,{1,}/g, '.')
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

		target.value = text.replace(/,/g, '.').replace(/\s/g, '');
	};

	const handleKeyDown = event => {
		const { key, target } = event;
		const { selectionStart, value } = target;

		if (key === ',') {
			event.preventDefault();
			target.value = `${value.substr(0, selectionStart)}.${value.substr(selectionStart, value.length)}`;
		}
	};

	const handleValueChange = values => {
		const { value } = values;
		const len = value.length;

		if (label && len > 0 && !active) {
			setActive(true);
		} else if (label && len === 0 && active) {
			setActive(false);
		}

		input.onChange(value);
	};

	return (
		<div className={classes}>
			<NumberFormat
				{...custom}
				decimalScale={2}
				className={'form_control'}
				allowNegative={false}
				thousandSeparator={','}
				onKeyDown={handleKeyDown}
				// onPaste={handlePaste}
				onValueChange={handleValueChange}
			/>
			{label && <label htmlFor={id || input.name}>{label}</label>}
			{(error && touched) && <span className={'form-group_error'}>{error}</span>}
		</div>
	);
};
