import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SearchIcon } from 'components/Icons';
import { createStructuredSelector } from 'reselect';
import { useDebounce, useLoading } from 'hooks';
import { makeSelectFilterSearch } from '../../store/selectors';
import { changeFilter, pullProjectData } from '../../store/actions';

const HeaderSearch = (props) => {
	const {
		search,
	} = props;

	const [isLoading, load] = useLoading();

	const [, cancel] = useDebounce(() => {
		load(props.pullProjectData());
	}, 1000, [search]);

	React.useEffect(() => {
		cancel();
	}, []);

	const handleInputFocus = (e) => {
		e.target.parentNode.classList.add('focus');
	};

	const handleInputBlur = (e) => {
		if (e.target.value !== '') return;

		e.target.parentNode.classList.remove('focus');
	};

	const handleChangeSearch = (e) => {
		e.persist();
		const { value } = e.target;

		if (isLoading) return;

		props.changeFilter('search', value);
	};

	return (
		<div className={'hf_input'}>
			<input
				type="text"
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				onChange={handleChangeSearch}
				value={search}
				placeholder={'Search...'}
			/>
			<SearchIcon />
		</div>
	);
};

HeaderSearch.propTypes = {
	search: PropTypes.string.isRequired,
	pullProjectData: PropTypes.func.isRequired,
	changeFilter: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
	search: makeSelectFilterSearch(),
});

const mapDispatchToProps = {
	pullProjectData,
	changeFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(HeaderSearch));
