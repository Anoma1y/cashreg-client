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
import SidebarMenu from '../SidebarMenu';
import SidebarHeader from '../SidebarHeader';
import SidebarActions from '../SidebarActions';
import {
	TransactionsIcon,
	OverviewIcon,
} from 'components/Icons';

const LS_KEY = "sidebarState";
const V_THRESHOLD = 0.05; // velocity --> how fast the swipe is
const D_THRESHOLD = 0.4; // direction --> how straight the swipe is
const MOBILE_BREAKPOINT = 768;
const SIDEBAR_WIDTH = 238;

const routes = [
	{ id: 1, name: 'Overview', linkTo: '/', icon: <OverviewIcon /> },
	{ id: 2, name: 'Transactions', linkTo: '/transactions', icon: <TransactionsIcon /> },
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
		if (direction[0] < -D_THRESHOLD && last && velocity > V_THRESHOLD) {
			setIsOpen(false);
		}
		if (direction[0] > D_THRESHOLD && last && velocity > V_THRESHOLD) {
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
		// transform: to(sidebarStyle.translate, x => `translateX(${x}%)`)
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
	const { style, toggleSidebar, dragSidebar, sidebarWidth, isOpen } = useContext(Context);

	return (
		<animated.div
			{...dragSidebar()}
			className="fixed top-0 left-0 h-full text-white py-12 px-6 scrolling-touch"
			style={{
				...style,
				width: sidebarWidth,
				backgroundColor: "#363740"
			}}
		>

			<SidebarHeader
				isOpen={isOpen}
			/>

			<SidebarActions
				isOpen={isOpen}
			/>

			<SidebarMenu
				isOpen={isOpen}
				routes={routes}
				toggleSidebar={toggleSidebar}
			/>
		</animated.div>
	);
};

export default memo(Sidebar);
