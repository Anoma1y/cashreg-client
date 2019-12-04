import { createSelector } from 'reselect';
import { INITIAL_STATE } from './reducer';
import { format as formatDate } from 'date-fns';

const getProjectStatus = project => {
	if (project.finished_at) {
		return 'Finished';
	} else if (project.archived_at) {
		return 'Archived';
	}

	return 'Active';
};

export const selectProject = state => state.project || INITIAL_STATE;

export const makeSelectFilter = () =>
	createSelector(
		selectProject,
		state => state.filter,
	);

export const makeSelectFilterStatus = () =>
	createSelector(
		selectProject,
		state => state.filter.status,
	);

export const makeSelectFilterContragent = () =>
	createSelector(
		selectProject,
		state => state.filter.contragent,
	);

export const makeSelectFilterSearch = () =>
	createSelector(
		selectProject,
		state => state.filter.search,
	);

export const makeSelectFilterDate = () =>
	createSelector(
		selectProject,
		state => ({
			from: state.filter.date_from,
			to: state.filter.date_to,
		}),
	);

export const makeSelectProjectOrder = () =>
	createSelector(
		selectProject,
		state => state.project_order,
	);

export const makeSelectReady = () =>
	createSelector(
		selectProject,
		state => state.ready,
	);

export const makeSelectProject = () =>
	createSelector(
		selectProject,
		state => state.project,
	);

export const makeSelectFormattedProject = () =>
	createSelector(
		selectProject,
		state => state.project.map(project => ({
			...project,
			start_date_formatted: formatDate(project.start_date * 1000, 'dd.MM.yyyy'),
			end_date_formatted: formatDate(project.end_date * 1000, 'dd.MM.yyyy'),
			contragent_title: project.contragent ? project.contragent.title : '-',
			status: getProjectStatus(project),
		})),
	);
