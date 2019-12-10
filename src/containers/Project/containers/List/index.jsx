import React, { memo, useEffect } from 'react';
import { useLocalStorage } from 'hooks';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Cookie from 'utils/cookie';
import { pullProject, pullProjectData } from '../../store/actions';
import { makeSelectReady } from 'layouts/Main/store/selectors';

import TableWrapper from 'components/TableWrapper';
import ProjectList from '../../components/ProjectList';

import HeaderSearch from '../../components/HeaderSearch';
import HeaderFilter from '../../components/HeaderFilter';
import SidebarFilter from '../../components/SidebarFilter';

const LS_KEY = 'sidebarFilterState';

const List = (props) => {

	useEffect(() => {
		props.pullProjectData({ init_page: Cookie.get('init_page') }); // todo add key in constants
	}, []);

	return (
		<TableWrapper
			lsKey={'project-filter'}
			header
			headerLeftContent={<HeaderFilter />}
			headerRightContent={<HeaderSearch />}
			sidebarFilter={<SidebarFilter />}
		>
			<ProjectList />
		</TableWrapper>
	);
};

const mapStateToProps = createStructuredSelector({
	globalReady: makeSelectReady(),
});

const mapDispatchToProps = {
	pullProject,
	pullProjectData,
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(List));
