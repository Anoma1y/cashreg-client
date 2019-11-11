import React, { memo } from 'react';
import { SidebarIcon } from 'components/Icons';
import PropTypes from 'prop-types';

const SidebarFooter = ({ toggleSidebar }) => (
	<div className={'sidebar-footer'}>
		<button
			type={'submit'}
			className={'sidebar-menu_link'}
			style={{ width: '100%' }}
			onClick={toggleSidebar}
		>
			<SidebarIcon />
			<span>Toggle Sidebar</span>
		</button>
	</div>
);

SidebarFooter.propTypes = {
	toggleSidebar: PropTypes.func.isRequired,
};

export default memo(SidebarFooter);
