import React, { useState, memo } from 'react';
import cx from 'classnames';

const TextAreaField = props => {
	const {
		input,
		type,
		meta: {
			error,
			touched,
		},
		label,
		placeholder,
		id,
	} = props;
	const [active, setActive] = useState(false);
	const classes = cx(
		'form-group',
		active && 'active',
		error && 'error',
	);

	const handleChange = e => {
		const { value } = e.target;
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
			<textarea
				type={type}
				id={id || input.name}
				value={input.value}
				className="form_control"
				placeholder={placeholder}
				onChange={handleChange}
				rows={4}
			/>
			{(error && touched) && <span className={'form-group_error'}>{error}</span>}
		</div>
	);
};

export default memo(TextAreaField);
