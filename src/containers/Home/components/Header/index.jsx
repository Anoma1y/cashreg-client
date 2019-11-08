import React from 'react';
import HeaderUser from '../HeaderUser';
import './index.scss';

const Header = ({ location }) => {
	const title = location.pathname.split('/').filter(n => n !== '')[0];

	return (
		<header className={'header'}>
			<div className={'header_title'}>
				<p>{title}</p>
			</div>
			<div className={'header-navbar'}>
				{/*<HeaderSearch />*/}
				<div className="divider" />
				<HeaderUser />
			</div>
		</header>
	)
}
export default Header;
