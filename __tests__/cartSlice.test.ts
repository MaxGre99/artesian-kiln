import cartReducer, {
	addItem,
	incrementQuantity,
	removeItem,
	updateQuantity,
} from '../store/cartSlice';
import { CartState } from '../types';

const initialState: CartState = {
	items: [
		{ id: 'ocean-wave', quantity: 0 },
		{ id: 'forest-fern', quantity: 0 },
		{ id: 'terracotta-dot', quantity: 0 },
		{ id: 'yellow-star', quantity: 0 },
	],
};

describe('cartSlice', () => {
	it('returns the initial state', () => {
		expect(cartReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
	});

	describe('updateQuantity', () => {
		it('sets quantity for a tile', () => {
			const state = cartReducer(
				initialState,
				updateQuantity({ id: 'ocean-wave', quantity: 50 }),
			);
			expect(state.items.find((i) => i.id === 'ocean-wave')?.quantity).toBe(50);
		});

		it('does not allow negative quantity', () => {
			const state = cartReducer(
				initialState,
				updateQuantity({ id: 'ocean-wave', quantity: -5 }),
			);
			expect(state.items.find((i) => i.id === 'ocean-wave')?.quantity).toBe(0);
		});
	});

	describe('incrementQuantity', () => {
		it('increments by 1', () => {
			const state = cartReducer(
				{ items: [{ id: 'forest-fern', quantity: 3 }] },
				incrementQuantity('forest-fern'),
			);
			expect(state.items[0].quantity).toBe(4);
		});
	});

	describe('removeItem', () => {
		it('removes a tile from the cart', () => {
			const state = cartReducer(initialState, removeItem('ocean-wave'));
			expect(state.items.find((i) => i.id === 'ocean-wave')).toBeUndefined();
			expect(state.items.length).toBe(3);
		});
	});

	describe('addItem', () => {
		it('adds a new tile', () => {
			const state = cartReducer({ items: [] }, addItem('yellow-star'));
			expect(state.items).toHaveLength(1);
			expect(state.items[0]).toEqual({ id: 'yellow-star', quantity: 0 });
		});

		it('does not duplicate existing tile', () => {
			const state = cartReducer(
				{ items: [{ id: 'ocean-wave', quantity: 10 }] },
				addItem('ocean-wave'),
			);
			expect(state.items).toHaveLength(1);
			expect(state.items[0].quantity).toBe(10);
		});
	});
});
