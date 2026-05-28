import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GridState, TileId } from '@/types';

const GRID_SIZE = 6;

const createEmptyGrid = () => {
	return Array.from({ length: GRID_SIZE }, () =>
		Array.from({ length: GRID_SIZE }, () => null),
	);
};

const initialState: GridState = {
	cells: createEmptyGrid(),
	selectedTile: null,
};

const gridSlice = createSlice({
	name: 'grid',
	initialState,
	reducers: {
		selectTile(state, action: PayloadAction<TileId | null>) {
			state.selectedTile = action.payload;
		},
		placeTile(state, action: PayloadAction<{ row: number; col: number }>) {
			const { row, col } = action.payload;
			if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
				if (state.cells[row][col] === state.selectedTile) {
					// Выкл на той же плитке
					state.cells[row][col] = null;
				} else {
					state.cells[row][col] = state.selectedTile;
				}
			}
		},
		clearCell(state, action: PayloadAction<{ row: number; col: number }>) {
			const { row, col } = action.payload;
			state.cells[row][col] = null;
		},
		clearGrid(state) {
			state.cells = createEmptyGrid();
		},
	},
});

export const { selectTile, placeTile, clearCell, clearGrid } =
	gridSlice.actions;
export default gridSlice.reducer;
