import React, { useState, useEffect, memo } from 'react';
import { useLocalStorage } from 'hooks';
import HeaderFilter from './HeaderFilter';
import SidebarFilterContainer from './SidebarFilter';
import './index.scss';

const TableWrapper = (props) => {
	const {
		// lsKey,
		HeaderLeftContent,
		HeaderRightContent,
		header,
		SidebarFilter,
		children,
	} = props;
	const [filterIsOpen, setFilterIsOpen] = useState(false);
	// const [persistedState] = useLocalStorage(lsKey);

	// useEffect(() => {
	// 	localStorage.setItem(lsKey, JSON.stringify({ isOpen: filterIsOpen }));
	// }, [filterIsOpen]);

	// useEffect(() => {
	// 	setFilterIsOpen(persistedState ? persistedState.isOpen : false);
	// }, [setFilterIsOpen, persistedState]);

	const toggleFilterOpen = () => setFilterIsOpen(!filterIsOpen);
	const contentWidth = filterIsOpen ? 'calc(100% - 232px - 1rem)' : '100%';

	return (
		<div className={'table-wrapper'}>
			<div
				className={'table-wrapper-content'}
				style={{
					width: contentWidth,
				}}
			>
				{(HeaderLeftContent || HeaderRightContent) && (
					<HeaderFilter
						toggleFilterOpen={toggleFilterOpen}
						leftContent={<HeaderLeftContent />}
						rightContent={<HeaderRightContent />}
					>
						{/*{header}*/}
					</HeaderFilter>
				)}
				{children}
			</div>

			{SidebarFilter && (
				<SidebarFilterContainer isOpen={filterIsOpen}>
					{<SidebarFilter />}
				</SidebarFilterContainer>
			)}
		</div>
	);
};

export default memo(TableWrapper);
