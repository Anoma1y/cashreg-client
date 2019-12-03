
export const toInt = val => (val ? Number(val) : null);

export const toFloat = val => parseFloat(val);

export const amountToInteger = (val, precision = 2) =>
	val ? toFloat(val).toFixed(precision) * 100 : null; // todo назвать нормально
