import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { makeSelectContragent } from 'containers/Contragent/store/selectors';
import { makeSelectFilterContragent } from '../../store/selectors';
import { changeFilter } from '../../store/actions';
import MultiSelect from 'components/MultiSelect';

const SidebarFilter = (props) => {
	const {
		contragent,
		selectContragent,
	} = props;

	return (
		<>
			<div className={'filter-item'}>
				<p className="filter-item_label">Contragent</p>

				<MultiSelect
					selectItems={selectContragent}
					data={contragent}
					changeFilter={props.changeFilter}
					filterKey={'contragent'}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(SidebarFilter));
