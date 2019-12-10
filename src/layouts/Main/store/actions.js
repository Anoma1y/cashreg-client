import {
	SET_USER,
	PULL_DATA,
	SET_READY,
	SET_LOADING,
	SET_CURRENCY,
	PULL_CURRENCY,
	CREATE_TRANSACTION,
	PULL_USER,
	SET_WORKSPACE,
	SET_ACTIVE_WORKSPACE,
} from './constants';
import Cookie from 'utils/cookie';
import Api from 'api';
import { removeEmpty } from 'utils/helpers';
import { amountToInteger, toInt } from 'utils/amount';
import { getUnixTime, fromUnixTime } from 'date-fns';
import { AppToater } from 'components/Toaster';
import { Intent } from '@blueprintjs/core';

export const setUser = value => ({ type: SET_USER, payload: value });

export const setWorkspace = value => ({ type: SET_WORKSPACE, payload: value });

export const setCurrency = value => ({ type: SET_CURRENCY, payload: value });

export const setActiveWorkspace = value => ({ type: SET_ACTIVE_WORKSPACE, payload: value });

export const setReady = value => ({ type: SET_READY, payload: value });

export const setLoading = value => ({ type: SET_LOADING, payload: value });

export function pullHomeData() {
	return (dispatch) => new Promise((resolve, reject) => {
		Promise.all([Api.getCurrencyList(), Api.getMe(), Api.getWorkspaceList()])
			.then(data => {
				const [currencyList, user, workspaceList] = data;

				const active_workspace_id = Cookie.get('active_workspace');

				if (active_workspace_id) {
					const active_workspace = workspaceList.data.find(ws => ws.id === parseInt(active_workspace_id));

					dispatch(setActiveWorkspace(active_workspace));
				} else {
					const active_workspace = workspaceList.data.find(ws => ws.is_personal);

					Cookie.set('active_workspace', active_workspace.id.toString(), { expires: 7 });
					dispatch(setActiveWorkspace(active_workspace));
				}

				dispatch(setCurrency(currencyList.data));
				dispatch(setUser(user.data));
				dispatch(setWorkspace(workspaceList.data));

				resolve();
			})
			.catch(reject);
	});
}

export function createTransaction() {
	return async (dispatch, getState) => {
		const { syncErrors, values } = getState().form.transaction;

		try {
			if (syncErrors || !values) {
				AppToater.show({ message: 'Fill in all required fields', intent: Intent.WARNING });
				return;
			}

			const active_workspace_id = Cookie.get('active_workspace');

			const data = removeEmpty({
				type: toInt(transactionType),
				sum: amountToInteger(values.sum),
				category_id: toInt(values.category),
				currency_id: toInt(values.currency),
				contragent_id: toInt(values.contragent),
				project_id: toInt(values.project),
				registered_at: values.registered_at,
				comment: values.comment,
			});

			// Api.createTransaction(data, active_workspace_id);
			// AppToater.show({ message: 'Transaction has been created', intent: Intent.SUCCESS });
		} catch (e) {
			console.error(e);
		}
	}
}
