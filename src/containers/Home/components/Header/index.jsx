import React from 'react';
import HeaderUser from '../HeaderUser';
import './index.scss';

const Header = () => (
	<header className={'header'}>
		<div className={'header_title'}>
			<p>Overview</p>
		</div>
		<div className={'header-navbar'}>
			{/*<HeaderSearch />*/}
			<div className="divider" />
			<HeaderUser />
		</div>
	</header>
);

export default Header;
