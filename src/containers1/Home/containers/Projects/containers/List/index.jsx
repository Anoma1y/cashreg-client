import React, { useState, useEffect } from 'react';
import { useLocalStorage } from 'hooks';
import TableWrapper from 'src/containers1/Home/components/TableWrapper';
import ProjectList from '../../components/ProjectList';

const LS_KEY = 'sidebarFilterState';

const List = () => {
	return (
		<TableWrapper>
			<ProjectList />
		</TableWrapper>
	)
};

export default List;
