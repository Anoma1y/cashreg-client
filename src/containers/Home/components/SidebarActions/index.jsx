import React, { memo } from 'react';
import { Button } from '@blueprintjs/core';
import { PlusIcon } from 'components/Icons';
import { animated, useSpring } from 'react-spring';
import './index.scss';

const SidebarActions = ({ isOpen }) => {
	const sidebarStyle = useSpring({
		width: isOpen ? 182 : 40,
		right: isOpen ? 0 : -95,
	});

	const sidebarStyleText = useSpring({
		opacity: isOpen ? 1 : 0
	})

	return (
		<div className={'sidebar-actions'}>
			<animated.button
				style={sidebarStyle}
				className={'sidebar-actions_btn'}
			>
				{isOpen ? <animated.span style={sidebarStyleText}>Add transaction</animated.span> : <PlusIcon />}
			</animated.button>
		</div>
	)
};

export default memo(SidebarActions);
