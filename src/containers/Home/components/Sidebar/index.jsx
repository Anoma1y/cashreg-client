import React, {
	useState,
	useEffect,
	useContext,
	memo,
} from 'react';
import { useSpring, animated, to } from "react-spring";
import { useDrag } from 'react-use-gesture';
import {
	useWindowSize,
	useLocalStorage,
} from 'hooks';
import { Context } from '../../index';
import SidebarMenu from './Menu';
import SidebarHeader from './Header';
import SidebarActions from './Actions';
import SidebarFooter from './Footer';
import {
	TransactionsIcon,
	OverviewIcon,
	UsersIcon,
	EntityIcon,
	ProjectIcon,
	CategoryIcon,
} from 'components/Icons';
import './index.scss';

const LS_KEY = "sidebarState";
const VELOCITY_THRESHOLD = 0.05; // how fast the swipe is
const DIRECTION_THRESHOLD = 0.4; // how straight the swipe is
const MOBILE_BREAKPOINT = 768;
const SIDEBAR_WIDTH = 238;

const routes = [
	{ id: 1, name: 'Overview', linkTo: '/overview', icon: <OverviewIcon /> },
	{ id: 2, name: 'Transactions', linkTo: '/transactions', icon: <TransactionsIcon /> },
	{ id: 3, name: 'Workspaces', linkTo: '/workspaces', icon: <UsersIcon /> },
	{ id: 4, name: 'Cagegories', linkTo: '/categories', icon: <CategoryIcon /> },
	{ id: 5, name: 'Contragents', linkTo: '/contragents', icon: <EntityIcon /> },
	{ id: 6, name: 'Projects', linkTo: '/projects', icon: <ProjectIcon /> },
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

	const dragSidebar = useDrag(({ direction, velocity, last }) => {
		if (direction[0] < -DIRECTION_THRESHOLD && last && velocity > VELOCITY_THRESHOLD) {
			setIsOpen(false);
		}
		if (direction[0] > DIRECTION_THRESHOLD && last && velocity > VELOCITY_THRESHOLD) {
			setIsOpen(true);
		}
	});

	const sidebarStyle = useSpring({
		translate: [isOpen ? 0 : (isMobile ? -sidebarWidth : -(sidebarWidth - 48))]
	});

	const mainStyle = useSpring({
		marginLeft: isMobile ? 0 : isOpen ? sidebarWidth : 48
	});

	const style = {
		transform: to(sidebarStyle.translate, x => `translateX(${x}px)`)
	};

	return {
		toggleSidebar,
		isOpen,
		sidebarWidth,
		style,
		mainStyle,
		dragSidebar,
	};
};

const Sidebar = () => {
	const { style, toggleSidebar, dragSidebar, sidebarWidth, isOpen, setTransactionIsOpen } = useContext(Context);

	return (
		<animated.div
			{...dragSidebar()}
			className="sidebar sidebar-wrapper"
			style={{
				...style,
				width: sidebarWidth,
			}}
		>
			<div className="sidebar-content">
				<SidebarHeader
					isOpen={isOpen}
				/>

				<SidebarActions
					isOpen={isOpen}
					setTransactionIsOpen={setTransactionIsOpen}
				/>

				<SidebarMenu
					isOpen={isOpen}
					routes={routes}
					// toggleSidebar={toggleSidebar}
				/>

				<SidebarFooter
					isOpen={isOpen}
				/>
			</div>
		</animated.div>
	);
};

export default memo(Sidebar);
