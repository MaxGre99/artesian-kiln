import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FormErrors, FormState, PaymentMethod } from '@/types';

type StringField =
	| 'name'
	| 'phone'
	| 'email'
	| 'address'
	| 'projectNotes'
	| 'cardNumber'
	| 'expiration'
	| 'cvv';

const initialState: FormState = {
	name: '',
	phone: '',
	email: '',
	address: '',
	projectNotes: '',
	paymentMethod: 'credit',
	cardNumber: '',
	expiration: '',
	cvv: '',
	errors: {},
	submitted: false,
};

const formSlice = createSlice({
	name: 'form',
	initialState,
	reducers: {
		updateField(
			state,
			action: PayloadAction<{ field: StringField; value: string }>,
		) {
			const { field, value } = action.payload;
			state[field] = value;
			const errKey = field as keyof FormErrors;
			if (state.errors[errKey]) {
				delete state.errors[errKey];
			}
		},
		setPaymentMethod(state, action: PayloadAction<PaymentMethod>) {
			state.paymentMethod = action.payload;
			if (action.payload !== 'credit') {
				delete state.errors.cardNumber;
				delete state.errors.expiration;
				delete state.errors.cvv;
			}
		},
		setErrors(state, action: PayloadAction<FormErrors>) {
			state.errors = action.payload;
		},
		clearErrors(state) {
			state.errors = {};
		},
		setSubmitted(state, action: PayloadAction<boolean>) {
			state.submitted = action.payload;
		},
		resetForm() {
			return initialState;
		},
	},
});

export const {
	updateField,
	setPaymentMethod,
	setErrors,
	clearErrors,
	setSubmitted,
	resetForm,
} = formSlice.actions;

export default formSlice.reducer;
