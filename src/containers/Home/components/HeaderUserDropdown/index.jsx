import React, {
	memo,
	useState,
	useEffect,
	useRef,
} from 'react';
import { NavLink } from 'react-router-dom';
import { useClickOutside } from 'hooks';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
	makeSelectActiveWorkspaceName,
	makeSelectUserInfo,
} from '../../store/selectors';
import PropTypes from 'prop-types';

const HeaderUserDropdown = ({ isOpen, setIsOpen, user_info, workspace_name }) => {
	const ref = useRef(null);

	useClickOutside(ref, () => {
		if (isOpen) setIsOpen(false)
	});

	return (
		<div
			className="header-user-dropdown"
			ref={ref}
			style={{
				display: isOpen ? 'block' : 'none',
			}}
		>
			<ul>
				<li className="current-user">
					<p className={'user-name'}>{user_info.name}</p>
					<p>{user_info.login}</p>
					<p>{workspace_name}</p>
				</li>
				<li className="divider" />
				<li><NavLink className={'header-user-dropdown_link'} to={'/'}>Profile</NavLink></li>
				<li><NavLink className={'header-user-dropdown_link'} to={'/'}>Settings</NavLink></li>
				<li className="divider" />
				<li><span className={'header-user-dropdown_link'}>Sign out</span></li>
			</ul>

		</div>
	)
};

HeaderUserDropdown.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
	user_info: PropTypes.object.isRequired,
	workspace_name: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
	workspace_name: makeSelectActiveWorkspaceName(),
	user_info: makeSelectUserInfo(),
});

export default connect(mapStateToProps)(memo(HeaderUserDropdown))
