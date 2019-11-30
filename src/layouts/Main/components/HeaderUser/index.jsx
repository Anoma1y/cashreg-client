import React, { useState, useRef, memo } from 'react';
import { useClickOutside } from 'hooks';
import { NavLink } from 'react-router-dom';
import { UserIcon } from 'components/Icons';
import HeaderUserDropdown from '../HeaderUserDropdown';
import './index.scss';

const HeaderUser = () => {
	const [isOpen, setIsOpen] = useState(false);

	const renderAvatar = () => {
		return (
			<div className={'header-user_avatar header-user_avatar__placeholder'}>
				<UserIcon />
			</div>
		);
	};

	return (
		<div className={'header-user'}>
			<div className={'header-user_avatar-container'} onClick={() => setIsOpen(true)}>
				<div
					className={'header-user_avatar'}
					style={{
						backgroundImage: `url('https://i.ytimg.com/vi/naJd-mHU0Pw/maxresdefault.jpg')`,
					}}
				/>
			</div>

			<HeaderUserDropdown isOpen={isOpen} setIsOpen={setIsOpen} />
		</div>
	);
};

export default memo(HeaderUser);
