import React from 'react';
import Table from 'components/Table';
import FilterWrapper from '../../../../components/Filter';
import TransactionFilter from '../../components/SidebarFilter';
import TransactionList from '../../components/TransactionList';
import HeaderFilter from '../../components/HeaderFilter';

const List = () => {
	const [filterIsOpen, setFilterIsOpen] = React.useState(false);
	const toggleFilterOpen = () => setFilterIsOpen(!filterIsOpen);
	const contentWidth = filterIsOpen ? 'calc(100% - 232px - 1rem)' : '100%';

	return (
		<div className={'transactions'}>
			<div
				className={'transactions-content'}
				style={{
					width: contentWidth,
				}}
			>
				<HeaderFilter toggleFilterOpen={toggleFilterOpen} />
				<TransactionList />
			</div>

			<FilterWrapper isOpen={filterIsOpen}>
				<TransactionFilter />
			</FilterWrapper>
		</div>
	)
};

export default List;
