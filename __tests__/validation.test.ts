import { FormState } from '../types';
import { validateForm } from '../utils/validation';

const baseForm: FormState = {
	name: 'Jane Doe',
	phone: '555-0100',
	email: 'jane@example.com',
	address: '123 Tile St, Portland, OR 97201',
	projectNotes: '',
	paymentMethod: 'credit',
	cardNumber: '1234 5678 9012 3456',
	expiration: '12/26',
	cvv: '123',
	errors: {},
	submitted: false,
};

describe('validateForm', () => {
	it('passes with all valid fields', () => {
		expect(validateForm(baseForm)).toEqual({});
	});

	it('requires customer name', () => {
		const errors = validateForm({ ...baseForm, name: '' });
		expect(errors.name).toBeDefined();
	});

	it('requires email', () => {
		const errors = validateForm({ ...baseForm, email: '' });
		expect(errors.email).toBeDefined();
	});

	it('rejects invalid email format', () => {
		const errors = validateForm({ ...baseForm, email: 'not-an-email' });
		expect(errors.email).toBeDefined();
	});

	it('accepts valid email', () => {
		const errors = validateForm({ ...baseForm, email: 'user@domain.co' });
		expect(errors.email).toBeUndefined();
	});

	it('requires address', () => {
		const errors = validateForm({ ...baseForm, address: '' });
		expect(errors.address).toBeDefined();
	});

	describe('credit card validation', () => {
		it('requires 16-digit card number', () => {
			const errors = validateForm({ ...baseForm, cardNumber: '1234' });
			expect(errors.cardNumber).toBeDefined();
		});

		it('accepts 16-digit card number with spaces', () => {
			const errors = validateForm({
				...baseForm,
				cardNumber: '1234 5678 9012 3456',
			});
			expect(errors.cardNumber).toBeUndefined();
		});

		it('requires expiration in MM/YY format', () => {
			const errors = validateForm({ ...baseForm, expiration: '1226' });
			expect(errors.expiration).toBeDefined();
		});

		it('accepts MM/YY expiration', () => {
			const errors = validateForm({ ...baseForm, expiration: '12/26' });
			expect(errors.expiration).toBeUndefined();
		});

		it('requires 3-4 digit CVV', () => {
			const errors = validateForm({ ...baseForm, cvv: '12' });
			expect(errors.cvv).toBeDefined();
		});

		it('accepts 3-digit CVV', () => {
			const errors = validateForm({ ...baseForm, cvv: '123' });
			expect(errors.cvv).toBeUndefined();
		});
	});

	it('skips card validation for non-credit payment methods', () => {
		const errors = validateForm({
			...baseForm,
			paymentMethod: 'paypal',
			cardNumber: '',
			expiration: '',
			cvv: '',
		});
		expect(errors.cardNumber).toBeUndefined();
		expect(errors.expiration).toBeUndefined();
		expect(errors.cvv).toBeUndefined();
	});
});
