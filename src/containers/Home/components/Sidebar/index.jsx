import React, {
	useState,
	useEffect,
	useContext,
} from 'react';
import { useSpring, animated, to } from "react-spring";
import { useDrag } from 'react-use-gesture';
import {
	useWindowSize,
} from 'hooks';
import { Context } from '../../index';

const V_THRESHOLD = 0; // velocity --> how fast the swipe is
const D_THRESHOLD = 0.4; // direction --> how straight the swipe is
const MOBILE_BREAKPOINT = 768;
const SIDEBAR_WIDTH = 238;

export const useSidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { width } = useWindowSize();
	const [isMobile, setIsMobile] = useState(false);
	const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_WIDTH);

	useEffect(() => {
		setIsMobile(width < MOBILE_BREAKPOINT);
		setSidebarWidth(isMobile ? width : SIDEBAR_WIDTH);
	}, [width]);

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
		translate: [isOpen ? 0 : -80]
	});

	const mainStyle = useSpring({
		marginLeft: isMobile ? 0 : isOpen ? sidebarWidth : 0
	});

	const style = {
		transform: to(sidebarStyle.translate, x => `translateX(${x}%)`)
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
			<p>Sidebar</p>
		</animated.div>
	);
};

export default Sidebar;
