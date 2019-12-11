import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { useLoading } from 'hooks';
import { makeSelectContragent } from 'containers/Contragent/store/selectors';
import MultiSelect from 'components/MultiSelect';
import { makeSelectFilterContragent } from '../../store/selectors';
import { applyAndSetProjectFilter } from '../../store/actions';

const SidebarFilter = (props) => {
	const {
		contragent,
		selectContragent,
	} = props;

	const [isLoading, setLoad] = useLoading();

	const handleChangeFilter = (key, val) => {
		setLoad(props.applyAndSetProjectFilter(key, val));
	};

	return (
		<>
			<div className={'filter-item'}>
				<p className="filter-item_label">Contragent</p>

				<MultiSelect
					selectItems={selectContragent}
					data={contragent}
					disabled={isLoading}
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
	applyAndSetProjectFilter: PropTypes.func.isRequired,
	selectContragent: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
	contragent: makeSelectContragent(),
	selectContragent: makeSelectFilterContragent(),
});

const mapDispatchToProps = {
	applyAndSetProjectFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(SidebarFilter));
