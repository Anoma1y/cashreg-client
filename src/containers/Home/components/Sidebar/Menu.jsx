import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { SidebarIcon } from 'components/Icons';

const SidebarMenu = ({ routes }) => (
	<nav className={`sidebar-nav`}>
		<ul className={'sidebar-menu'}>
			{routes.map(route => (
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
		{console.log('update sidebar menu')}
	</nav>
);

export default memo(SidebarMenu);
