import { memoryHistory } from 'react-router-dom';
import configureStore from '../../store/configureStore';
import { isTokenExpired } from '../auth';

describe('auth test', () => {
	let store;

	beforeAll(() => {
		store = configureStore({}, memoryHistory);
	});

	describe('isTokenExpired', () => {
		const today = new Date();
		const date = new Date(today);

		it('should return false', () => {
			const soon = (date.setDate(date.getDate() + 1));

			expect(isTokenExpired(soon)).toBeFalsy();
		});

		it('should return true', () => {
			const late = (date.setDate(date.getDate() - 1));

			expect(isTokenExpired(late)).toBeTruthy();
		});
	});
});
