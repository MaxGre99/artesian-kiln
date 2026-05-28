import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CartState, TileId } from '@/types';

const initialState: CartState = {
	items: [
		{ id: 'ocean-wave', quantity: 0 },
		{ id: 'forest-fern', quantity: 0 },
		{ id: 'terracotta-dot', quantity: 0 },
		{ id: 'yellow-star', quantity: 0 },
	],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		updateQuantity(
			state,
			action: PayloadAction<{ id: TileId; quantity: number }>,
		) {
			const item = state.items.find((i) => i.id === action.payload.id);
			if (item) {
				item.quantity = Math.max(0, action.payload.quantity);
			}
		},
		incrementQuantity(state, action: PayloadAction<TileId>) {
			const item = state.items.find((i) => i.id === action.payload);
			if (item) {
				item.quantity += 1;
			}
		},
		removeItem(state, action: PayloadAction<TileId>) {
			state.items = state.items.filter((i) => i.id !== action.payload);
		},
		addItem(state, action: PayloadAction<TileId>) {
			if (!state.items.find((i) => i.id === action.payload)) {
				state.items.push({ id: action.payload, quantity: 0 });
			}
		},
	},
});

export const { updateQuantity, incrementQuantity, removeItem, addItem } =
	cartSlice.actions;

export default cartSlice.reducer;
