import React from 'react';
import { connect } from 'react-redux';
import HeaderUser from '../HeaderUser';
import HeaderAdd from '../HeaderAdd';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { makeSelectLocation } from 'store/app/selectors';
import './index.scss';

const Header = ({ location }) => {
	const title = location.pathname.split('/').filter(n => n !== '')[0];

	return (
		<header className={'header'}>
			<div className={'header_title'}>
				<p>{title}</p>
			</div>
			<div className={'header-navbar'}>
				<HeaderAdd />
				<div className="divider" />
				<HeaderUser />
			</div>
		</header>
	);
};

Header.propTypes = {
	location: PropTypes.any.isRequired,
};

const mapStateToProps = createStructuredSelector({
	location: makeSelectLocation(),
});

export default connect(mapStateToProps)(Header);
