import React, { memo } from 'react';
import './index.scss';
import LogoIcon from 'static/images/logo.svg';
import { animated, useSpring } from 'react-spring';

const SidebarHeader = ({ isOpen }) => {
	const styleSidebar = useSpring({
		right: isOpen ? -50 : 8
	});

	return (
		<div className={'sidebar-header'}>
			<animated.img style={styleSidebar} className={'sidebar-header_logo'} src={LogoIcon} alt="L" />
			<h1>onix<strong>dev</strong></h1>
		</div>
	)
};

export default memo(SidebarHeader);
