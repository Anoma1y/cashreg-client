import React, {
	memo,
} from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
	makeSelectActiveWorkspaceName,
	makeSelectUserInfo,
} from '../../store/selectors';
import { logout } from 'utils/auth';
import HeaderDropdown from '../HeaderDropdown';
import PropTypes from 'prop-types';

const HeaderUserDropdown = ({ isOpen, setIsOpen, user_info, workspace_name }) => {
	return (
		<HeaderDropdown
			isOpen={isOpen}
			setIsOpen={setIsOpen}
		>
			<ul>
				<li className="current-user">
					<p className={'user-name'}>{user_info.name}</p>
					<p>{user_info.login}</p>
					<p>{workspace_name}</p>
				</li>
				<li className="divider" />
				<li><NavLink className={'header-user-dropdown_link'} onClick={close} to={'/profile'}>Profile</NavLink></li>
				<li><NavLink className={'header-user-dropdown_link'} onClick={close} to={'/settings'}>Settings</NavLink></li>
				<li className="divider" />
				<li onClick={logout}><span className={'header-user-dropdown_link'}>Sign out</span></li>
			</ul>
		</HeaderDropdown>
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
