import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { makeSelectContragent } from 'containers/Contragent/store/selectors';
import MultiSelect from 'components/MultiSelect';
import { makeSelectFilterContragent } from '../../store/selectors';
import { changeFilter, applyAndSetProjectFilter } from '../../store/actions';

const SidebarFilter = (props) => {
	const {
		contragent,
		selectContragent,
	} = props;

	const handleChangeFilter = (key, val) => {
		props.applyAndSetProjectFilter(key, val);
	};

	return (
		<>
			<div className={'filter-item'}>
				<p className="filter-item_label">Contragent</p>

				<MultiSelect
					selectItems={selectContragent}
					data={contragent}
					changeFilter={handleChangeFilter}
					filterKey={'contragent_id'}
					labelKey={'title'}
				/>
			</div>
		</>
	);
};

SidebarFilter.propTypes = {
	contragent: PropTypes.array.isRequired,
	changeFilter: PropTypes.func.isRequired,
	selectContragent: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
	contragent: makeSelectContragent(),
	selectContragent: makeSelectFilterContragent(),
});

const mapDispatchToProps = {
	changeFilter,
	applyAndSetProjectFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(SidebarFilter));
