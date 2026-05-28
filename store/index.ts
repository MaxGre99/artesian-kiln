import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './cartSlice';
import formReducer from './formSlice';
import gridReducer from './gridSlice';

export const store = configureStore({
	reducer: {
		cart: cartReducer,
		grid: gridReducer,
		form: formReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
