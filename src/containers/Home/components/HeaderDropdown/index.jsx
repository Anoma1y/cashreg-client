import React, {
	memo,
	useRef,
} from 'react';
import { useClickOutside } from 'hooks';
import PropTypes from 'prop-types';

const HeaderDropdown = ({ isOpen, setIsOpen, children }) => {
	const ref = useRef(null);

	const close = () => setIsOpen(false);

	useClickOutside(ref, () => {
		if (isOpen) close();
	});

	return (
		<div
			className="header-user-dropdown"
			ref={ref}
			style={{
				display: isOpen ? 'block' : 'none',
			}}
		>
			{children}
		</div>
	)
};

HeaderDropdown.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
};

export default memo(HeaderDropdown);
