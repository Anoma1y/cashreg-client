import React, {
	useState,
	useRef,
	memo,
} from 'react';
import { useClickOutside } from 'hooks';
import { NavLink } from 'react-router-dom';
import './index.scss';

const HeaderUser = () => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef(null);

	useClickOutside(ref, () => {
		if (isOpen) setIsOpen(false)
	});

	return (
		<div className={'header-user'}>
			<div className={'header-user_avatar-container'} onClick={() => setIsOpen(true)}>
				<div
					className={'header-user_avatar'}
					style={{
						backgroundImage: `url('https://i.ytimg.com/vi/naJd-mHU0Pw/maxresdefault.jpg')`
					}}
				/>
			</div>
			<div
				className="header-user-dropdown"
				ref={ref}
				style={{
					display: isOpen ? 'block' : 'none',
				}}
			>
				<ul>
					<li className="current-user">
						<p className={'user-name'}>German Voytekhovich</p>
						<p>@Anoma1y</p>
					</li>
					<li className="divider" />
					<li><NavLink className={'header-user-dropdown_link'} to={'/'}>Profile</NavLink></li>
					<li><NavLink className={'header-user-dropdown_link'} to={'/'}>Settings</NavLink></li>
					<li className="divider" />
					<li><span className={'header-user-dropdown_link'}>Sign out</span></li>
				</ul>

			</div>
		</div>
	);
};

export default memo(HeaderUser);
