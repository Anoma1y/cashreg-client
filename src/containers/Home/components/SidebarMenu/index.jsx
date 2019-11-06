import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';
import { SidebarIcon } from 'components/Icons';
import './index.scss';

const SidebarMenu = ({ routes, isOpen, toggleSidebar }) => (
	<nav className={`sidebar-nav${!isOpen ? ' sidebar-nav__collapsed' : ''}`}>
		<ul className={'sidebar-menu'}>
			{routes.map((route) => (
				<NavLink
					className={'sidebar-menu_link'}
					activeClassName={'sidebar-menu_link__active'}
					key={route.id}
					to={route.linkTo}
				>
					{route.icon}
					<span>{route.name}</span>
				</NavLink>
			))}
		</ul>

		<ul className={'sidebar-menu sidebar-menu__bottom'}>
			<li className={'sidebar-menu_link'} onClick={toggleSidebar}>
				<SidebarIcon />
				<span>Toggle Sidebar</span>
			</li>
		</ul>
	</nav>
);

export default memo(SidebarMenu);
