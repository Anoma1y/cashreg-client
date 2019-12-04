import React, { useState, useEffect } from 'react';
import { useLocalStorage } from 'hooks';
import TableWrapper from 'components/TableWrapper';
// import ProjectList from '../../components/ProjectList';

import HeaderSearch from '../../components/HeaderSearch';
import HeaderFilter from '../../components/HeaderFilter';
import SidebarFilter from '../../components/SidebarFilter';

const LS_KEY = 'sidebarFilterState';

const List = () => {
	useEffect(() => {

	}, []);

	return (
		<TableWrapper
			lsKey={'project-filter'}
			header
			headerLeftContent={<HeaderFilter />}
			headerRightContent={<HeaderSearch />}
			sidebarFilter={<SidebarFilter />}
		>

		</TableWrapper>
	)
};

export default List;
