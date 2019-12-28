import React, { useState, useEffect, useContext, memo } from 'react';
import cx from 'classnames';
import { useSpring, animated, to } from 'react-spring';
import { useWindowSize, useLocalStorage } from 'hooks';
import {
	TransactionsIcon,
	OverviewIcon,
	UsersIcon,
	EntityIcon,
	ProjectIcon,
	CategoryIcon,
} from 'components/Icons';
import { useKeyOnly } from 'utils/ui';
import { Context } from '../../index';
import SidebarMenu from './Menu';
import SidebarHeader from './Header';
import SidebarActions from './Actions';
import SidebarFooter from './Footer';
import './index.scss';

const LS_KEY = 'sidebarState';
const MOBILE_BREAKPOINT = 768;
const SIDEBAR_WIDTH = 238;

const routes = [
	{ id: 1, name: 'Overview', linkTo: '/overview', icon: <OverviewIcon /> },
	{ id: 2, name: 'Transactions', linkTo: '/transaction', icon: <TransactionsIcon /> },
	{ id: 3, name: 'Workspaces', linkTo: '/workspace', icon: <UsersIcon /> },
	{ id: 4, name: 'Cagegories', linkTo: '/category', icon: <CategoryIcon /> },
	{ id: 5, name: 'Contragents', linkTo: '/contragent', icon: <EntityIcon /> },
	{ id: 6, name: 'Projects', linkTo: '/project', icon: <ProjectIcon /> },
];

export const useSidebar = () => {
	const [persistedState] = useLocalStorage(LS_KEY);
	const [isOpen, setIsOpen] = useState(false);
	const { width } = useWindowSize();
	const [isMobile, setIsMobile] = useState(false);
	const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_WIDTH);

	useEffect(() => {
		setIsMobile(width < MOBILE_BREAKPOINT);
		setSidebarWidth(isMobile ? width : SIDEBAR_WIDTH);
	}, [width]);

	useEffect(() => {
		localStorage.setItem(LS_KEY, JSON.stringify({ isOpen }));
	}, [isOpen]);

	useEffect(() => {
		setIsOpen(persistedState ? persistedState.isOpen : false);
	}, [setIsOpen, persistedState]);

	const toggleSidebar = () => setIsOpen(!isOpen);

	const sidebarStyle = useSpring({
		translate: [isOpen ? 0 : isMobile ? -sidebarWidth : -(sidebarWidth - 48)],
	});

	const mainStyle = useSpring({
		marginLeft: isMobile ? 0 : isOpen ? sidebarWidth : 48,
	});

	const style = {
		transform: to(sidebarStyle.translate, x => `translateX(${x}px)`),
	};

	return {
		toggleSidebar,
		isOpen,
		sidebarWidth,
		style,
		mainStyle,
	};
};

const Sidebar = () => {
	const {
		style,
		toggleSidebar,
		sidebarWidth,
		isOpen,
		setTransactionIsOpen,
	} = useContext(Context);
	const classes = cx('sidebar', 'sidebar-wrapper', useKeyOnly(!isOpen, 'sidebar__collapsed'));

	return (
		<animated.div
			className={classes}
			style={{
				...style,
				width: sidebarWidth,
			}}
		>
			<div className={'sidebar-content'}>
				<SidebarHeader isOpen={isOpen} />

				<SidebarActions isOpen={isOpen} setTransactionIsOpen={setTransactionIsOpen} />

				<SidebarMenu routes={routes} />
			</div>

			<SidebarFooter toggleSidebar={toggleSidebar} />
		</animated.div>
	);
};

export default memo(Sidebar);
