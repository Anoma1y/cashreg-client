import React, { useState, useEffect, memo } from 'react';
import { useLocalStorage } from 'hooks';
import HeaderFilter from './HeaderFilter';
import SidebarFilter from './SidebarFilter';
import './index.scss';

const TableWrapper = (props) => {
	const {
		lsKey,
		headerLeftContent,
		headerRightContent,
		header,
		sidebarFilter,
		children,
	} = props;
	const [filterIsOpen, setFilterIsOpen] = useState(false);
	const [persistedState] = useLocalStorage(lsKey);

	useEffect(() => {
		localStorage.setItem(lsKey, JSON.stringify({ isOpen: filterIsOpen }));
	}, [filterIsOpen]);

	useEffect(() => {
		setFilterIsOpen(persistedState ? persistedState.isOpen : false);
	}, [setFilterIsOpen, persistedState]);

	const toggleFilterOpen = () => setFilterIsOpen(!filterIsOpen);
	const contentWidth = filterIsOpen ? 'calc(100% - 232px - 1rem)' : '100%';
	console.log('update table wrapper')
	return (
		<div className={'table-wrapper'}>
			<div
				className={'table-wrapper-content'}
				style={{
					width: contentWidth,
				}}
			>
				{header && (
					<HeaderFilter
						toggleFilterOpen={toggleFilterOpen}
						leftContent={headerLeftContent}
						rightContent={headerRightContent}
					>
						{header}
					</HeaderFilter>
				)}
				{children}
			</div>

			{sidebarFilter && (
				<SidebarFilter isOpen={filterIsOpen}>
					{sidebarFilter}
				</SidebarFilter>
			)}
		</div>
	);
};

export default memo(TableWrapper);
