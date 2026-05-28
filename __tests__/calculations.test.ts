import { CartItem } from '../types';
import {
	calcGrandTotal,
	calcShipping,
	calcSubtotal,
	formatCurrency,
	SHIPPING_COST,
	SHIPPING_THRESHOLD,
} from '../utils/calculations';

describe('calcSubtotal', () => {
	it('returns 0 for empty cart', () => {
		expect(calcSubtotal([])).toBe(0);
	});

	it('calculates correctly for single item', () => {
		const items: CartItem[] = [{ id: 'ocean-wave', quantity: 10 }];
		expect(calcSubtotal(items)).toBe(280); // 10 * $28
	});

	it('sums multiple items correctly', () => {
		const items: CartItem[] = [
			{ id: 'ocean-wave', quantity: 5 }, // 5 * 28 = 140
			{ id: 'forest-fern', quantity: 3 }, // 3 * 30 = 90
			{ id: 'terracotta-dot', quantity: 2 }, // 2 * 26 = 52
			{ id: 'yellow-star', quantity: 1 }, // 1 * 29 = 29
		];
		expect(calcSubtotal(items)).toBe(311);
	});

	it('ignores items with 0 quantity', () => {
		const items: CartItem[] = [
			{ id: 'ocean-wave', quantity: 0 },
			{ id: 'forest-fern', quantity: 5 },
		];
		expect(calcSubtotal(items)).toBe(150); // 5 * 30
	});
});

describe('calcShipping', () => {
	it(`charges $${SHIPPING_COST} for orders under $${SHIPPING_THRESHOLD}`, () => {
		expect(calcShipping(100)).toBe(SHIPPING_COST);
		expect(calcShipping(499.99)).toBe(SHIPPING_COST);
		expect(calcShipping(SHIPPING_THRESHOLD)).toBe(SHIPPING_COST);
	});

	it('gives free shipping for orders over the threshold', () => {
		expect(calcShipping(500.01)).toBe(0);
		expect(calcShipping(1000)).toBe(0);
	});

	it('returns 0 shipping for empty cart', () => {
		expect(calcShipping(0)).toBe(0);
	});
});

describe('calcGrandTotal', () => {
	it('sums subtotal and shipping', () => {
		expect(calcGrandTotal(300, 25)).toBe(325);
		expect(calcGrandTotal(600, 0)).toBe(600);
	});
});

describe('formatCurrency', () => {
	it('formats with 2 decimal places', () => {
		expect(formatCurrency(28)).toBe('$28.00');
		expect(formatCurrency(0)).toBe('$0.00');
		expect(formatCurrency(1234.5)).toBe('$1234.50');
	});
});
