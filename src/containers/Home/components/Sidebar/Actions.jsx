import React, { memo } from 'react';
import { PlusIcon } from 'components/Icons';
import { animated, useSpring } from 'react-spring';

const SidebarActions = ({ isOpen, setTransactionIsOpen }) => {
	const sidebarStyle = useSpring({
		width: isOpen ? 182 : 40,
		right: isOpen ? 0 : -95,
	});

	const sidebarStyleText = useSpring({
		opacity: isOpen ? 1 : 0
	});

	const openDrawer = () => setTransactionIsOpen(true);

	return (
		<div className={'sidebar-actions'}>
			<animated.button
				style={sidebarStyle}
				className={'sidebar-actions_btn'}
				onClick={openDrawer}
			>
				{isOpen ? <animated.span style={sidebarStyleText}>Add transaction</animated.span> : <PlusIcon />}
			</animated.button>
		</div>
	)
};

export default memo(SidebarActions);
