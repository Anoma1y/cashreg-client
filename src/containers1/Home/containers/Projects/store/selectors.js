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

export const selectProjects = state => state.projects || INITIAL_STATE;

export const makeSelectFilter = () =>
	createSelector(
		selectProjects,
		state => state.filter,
	);

export const makeSelectProjectsOrder = () =>
	createSelector(
		selectProjects,
		state => state.projects_order,
	);

export const makeSelectReady = () =>
	createSelector(
		selectProjects,
		state => state.ready,
	);

export const makeSelectProjects = () =>
	createSelector(
		selectProjects,
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
