import React, { useState, useEffect } from 'react';
import Table from 'components/Table';
import FilterWrapper from '../../../../components/Filter';
import TransactionFilter from '../../components/SidebarFilter';
import TransactionList from '../../components/TransactionList';
import HeaderFilter from '../../components/HeaderFilter';
import { useLocalStorage } from 'hooks';

const LS_KEY = 'sidebarFilterState';

const List = () => {
	const [filterIsOpen, setFilterIsOpen] = useState(false);
	const [persistedState] = useLocalStorage(LS_KEY);

	useEffect(() => {
		localStorage.setItem(LS_KEY, JSON.stringify({ isOpen: filterIsOpen }));
	}, [filterIsOpen]);

	useEffect(() => {
		setFilterIsOpen(persistedState ? persistedState.isOpen : false);
	}, [setFilterIsOpen, persistedState]);

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
