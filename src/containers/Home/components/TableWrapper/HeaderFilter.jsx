import React, { memo } from 'react';
import { FilterIcon } from 'components/Icons';
import PropTypes from 'prop-types';

const HeaderFilter = ({ leftContent, rightContent, toggleFilterOpen }) => (
	<div className={'header-filter'}>
		<div className="header-filter_col">
			{leftContent}
		</div>
		<div className="header-filter_col">
			{rightContent}
			{toggleFilterOpen && (
				<button
					type={'button'}
					className={'hf_btn'}
					onClick={toggleFilterOpen}
				>
					<FilterIcon />
				</button>
			)}
		</div>
	</div>
);

HeaderFilter.propTypes = {
	leftContent: PropTypes.node,
	rightContent: PropTypes.node,
	toggleFilterOpen: PropTypes.func,
};

export default memo(HeaderFilter);
