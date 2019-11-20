import React, { memo } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { useDebounce } from 'hooks';
import {
	makeSelectCategories,
	makeSelectContragents,
	makeSelectProjects,
	makeSelectFilterSum,
	makeSelectFilterProjects,
	makeSelectFilterCategories,
	makeSelectFilterContragents,
} from '../../store/selectors';
import { changeFilter } from '../../store/actions';
import MultiSelect from '../MultiSelect';

const SidebarFilter = (props) => {
	const {
		categories,
		contragents,
		projects,
		selectCategories,
		selectContragents,
		selectProjects,
		sum,
	} = props;

	const [, cancel] = useDebounce(() => {}, 500, [sum.from, sum.to]);

	React.useEffect(() => {
		cancel();
	}, []);

	const handleChangeSum = (e) => {
		const { name, value } = e.target;

		props.changeFilter(name, value);
	};

	return (
		<>
			<div className={'filter-item'}>
				<p className="filter-item_label">Category</p>

				<MultiSelect
					selectItems={selectCategories}
					items={categories}
					changeFilter={props.changeFilter}
					filterKey={'categories'}
					labelKey={'name'}
				/>
			</div>
			<div className={'filter-item'}>
				<p className="filter-item_label">Contragent</p>

				<MultiSelect
					selectItems={selectContragents}
					items={contragents}
					changeFilter={props.changeFilter}
					filterKey={'contragents'}
					labelKey={'title'}
				/>
			</div>
			<div className={'filter-item'}>
				<p className="filter-item_label">Project</p>

				<MultiSelect
					selectItems={selectProjects}
					items={projects}
					changeFilter={props.changeFilter}
					filterKey={'projects'}
					labelKey={'title'}
				/>
			</div>
			<div className={'filter-item'}>
				<p className="filter-item_label">Sum</p>
				<div>
					<div>
						<input type="text" name={'sum_from'} value={sum.from} onChange={handleChangeSum} />
					</div>
					<div>
						<input type="text" name={'sum_to'} value={sum.to} onChange={handleChangeSum} />
					</div>
				</div>
			</div>
		</>
	);
};

SidebarFilter.propTypes = {
	categories: PropTypes.array.isRequired,
	contragents: PropTypes.array.isRequired,
	projects: PropTypes.array.isRequired,
	changeFilter: PropTypes.func.isRequired,
	sum: PropTypes.shape({
		from: PropTypes.any,
		to: PropTypes.any,
	}),
	selectCategories: PropTypes.array.isRequired,
	selectContragents: PropTypes.array.isRequired,
	selectProjects: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
	categories: makeSelectCategories(),
	contragents: makeSelectContragents(),
	projects: makeSelectProjects(),
	sum: makeSelectFilterSum(),
	selectCategories: makeSelectFilterCategories(),
	selectContragents: makeSelectFilterContragents(),
	selectProjects: makeSelectFilterProjects(),
});

const mapDispatchToProps = {
	changeFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(SidebarFilter));
