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

export const selectProject = state => state.projects || INITIAL_STATE;

export const makeSelectFilter = () =>
	createSelector(
		selectProject,
		state => state.filter,
	);

export const makeSelectProjectOrder = () =>
	createSelector(
		selectProject,
		state => state.projects_order,
	);

export const makeSelectReady = () =>
	createSelector(
		selectProject,
		state => state.ready,
	);

export const makeSelectProject = () =>
	createSelector(
		selectProject,
		state => {
			console.log('recomputed project')
			return state.projects.map(project => ({
				...project,
				start_date_formatted: formatDate(project.start_date * 1000, 'dd.MM.yyyy'),
				end_date_formatted: formatDate(project.end_date * 1000, 'dd.MM.yyyy'),
				contragent_title: project.contragent ? project.contragent.title : '-',
				status: getProjectStatus(project),
			}))
		},
	);
