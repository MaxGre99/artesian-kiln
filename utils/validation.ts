import { FormErrors, FormState } from '@/types';

export const validateForm = (form: FormState): FormErrors => {
	const errors: FormErrors = {};

	if (!form.name.trim()) {
		errors.name = 'Customer name is required';
	}
	if (!form.email.trim()) {
		errors.email = 'Email is required';
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
		errors.email = 'Enter a valid email address';
	}
	if (!form.address.trim()) {
		errors.address = 'Shipping address is required';
	}

	if (form.paymentMethod === 'credit') {
		const cleaned = form.cardNumber.replace(/[\s-]/g, '');
		if (!cleaned) {
			errors.cardNumber = 'Card number is required';
		} else if (!/^\d{16}$/.test(cleaned)) {
			errors.cardNumber = 'Card number must be 16 digits';
		}
		if (!form.expiration.trim()) {
			errors.expiration = 'Expiration date is required';
		} else if (!/^\d{2}\/\d{2}$/.test(form.expiration)) {
			errors.expiration = 'Use MM/YY format';
		}
		if (!form.cvv.trim()) {
			errors.cvv = 'CVV is required';
		} else if (!/^\d{3,4}$/.test(form.cvv)) {
			errors.cvv = '3-4 digits required';
		}
	}

	return errors;
};

export const formatCardNumber = (value: string): string => {
	const cleaned = value.replace(/\D/g, '').slice(0, 16);
	const groups = cleaned.match(/.{1,4}/g) || [];
	return groups.join(' ');
};

export const formatExpiration = (value: string): string => {
	const cleaned = value.replace(/\D/g, '').slice(0, 4);
	if (cleaned.length >= 2) {
		return cleaned.slice(0, 2) + '/' + cleaned.slice(2);
	}
	return cleaned;
};
