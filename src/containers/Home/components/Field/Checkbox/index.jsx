import React from 'react';
import { Checkbox } from '@blueprintjs/core';

const CheckboxWrapper = ({ input }) => (
	<Checkbox
		label={'Test'}
		{...input}
	/>
);

export default CheckboxWrapper;
