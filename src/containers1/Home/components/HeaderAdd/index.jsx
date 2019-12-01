import React, { useState, memo } from 'react';
import HeaderDropdown from '../HeaderDropdown';
import './index.scss';

const HeaderUser = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={'header-user'}>
			<div className={'header-user_avatar-container'} onClick={() => setIsOpen(true)}>
				+
			</div>
			<HeaderDropdown isOpen={isOpen} setIsOpen={setIsOpen}>
				<ul>
					<li className={'header-user-dropdown_link'}>Add transaction</li>
					<li className={'header-user-dropdown_link'}>Add contragent</li>
					<li className={'header-user-dropdown_link'}>Add category</li>
				</ul>
			</HeaderDropdown>
		</div>
	);
};

export default memo(HeaderUser);
