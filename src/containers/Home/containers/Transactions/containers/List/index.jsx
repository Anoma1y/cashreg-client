import React from 'react';
import Table from 'components/Table';
import TableWrapper from 'containers/Home/components/TableWrapper';
import TransactionFilter from '../../components/SidebarFilter';
import TransactionList from '../../components/TransactionList';
import HeaderFilter from '../../components/HeaderFilter';
import HeaderSearch from '../../components/HeaderSearch';

const List = () => {
	return (
		<TableWrapper
			lsKey={'transaction-filter'}
			header
			headerLeftContent={<HeaderFilter />}
			headerRightContent={<HeaderSearch />}
			sidebarFilter={<TransactionFilter />}
		>
			<TransactionList />
		</TableWrapper>
	);
};

export default List;
