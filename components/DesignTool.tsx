'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FaEraser } from 'react-icons/fa';
import { FaArrowRotateLeft } from 'react-icons/fa6';

import { TILES } from '@/data/tiles';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { clearCell, clearGrid, placeTile, selectTile } from '@/store/gridSlice';
import { TileId } from '@/types';

import { TilePattern } from './CollAndTilePattern';

const PALETTE_TILES: TileId[] = [
	'ocean-wave',
	'forest-fern',
	'terracotta-dot',
	'yellow-star',
	'ocean-wave',
	'terracotta-dot',
	'forest-fern',
	'yellow-star',
	'ocean-wave',
	'forest-fern',
];

const DesignTool = () => {
	const dispatch = useAppDispatch();
	const { cells, selectedTile } = useAppSelector((state) => state.grid);

	const handleCellClick = (row: number, col: number) => {
		if (selectedTile === ('__erase__' as unknown as TileId)) {
			dispatch(clearCell({ row, col }));
		} else {
			dispatch(placeTile({ row, col }));
		}
	};

	return (
		<div className='flex flex-col p-4 bg-parchment border-2 border-border-warm rounded-2xl'>
			<div className='flex items-center justify-between border-b border-border-warm pb-2 mb-4'>
				<div>
					<h3 className='tracking-widest text-ink'>VISUALIZE YOUR ORDER:</h3>
					<p className='font-heading text-[16px] text-ink-muted tracking-wide'>
						Select a tile from the palette, then click cells to place it.
					</p>
				</div>
				<div className='flex gap-1.5'>
					{/* Стиралка */}
					<button
						onClick={() =>
							dispatch(
								selectTile(
									selectedTile === ('__erase__' as unknown as TileId)
										? null
										: ('__erase__' as unknown as TileId),
								),
							)
						}
						className={`w-8 h-8 rounded-sm border flex items-center justify-center transition-all ${
							selectedTile === ('__erase__' as unknown as TileId)
								? 'bg-terracotta border-terracotta text-white shadow-tile'
								: 'bg-cream border-border-warm text-ink-muted hover:border-border-dark'
						}`}
						title='Eraser'
					>
						<FaEraser size={14} />
					</button>
					{/* Очистить */}
					<button
						onClick={() => dispatch(clearGrid())}
						className='w-8 h-8 rounded-sm border border-border-warm bg-cream text-ink-muted hover:border-border-dark flex items-center justify-center transition-all'
						title='Clear grid'
					>
						<FaArrowRotateLeft size={14} />
					</button>
				</div>
			</div>

			<div className='flex gap-2'>
				{/* 6x6 Сетка */}
				<div className='flex-1 flex items-center justify-center'>
					<div
						className='grid'
						style={{
							gridTemplateColumns: 'repeat(6, 64px)',
							gridTemplateRows: 'repeat(6, 64px)',
						}}
					>
						{cells.map((row, rowIdx) =>
							row.map((cell, colIdx) => (
								<motion.button
									key={`${rowIdx}-${colIdx}`}
									onClick={() => handleCellClick(rowIdx, colIdx)}
									whileHover={{ scale: 0.95 }}
									whileTap={{ scale: 0.9 }}
									className={`relative border border-border-warm/30 aspect-square transition-all ${
										!cell
											? 'bg-cream hover:bg-cream-dark cursor-pointer'
											: 'cursor-pointer hover:opacity-80'
									} ${
										selectedTile && !cell
											? 'hover:ring-1 hover:ring-teal/50'
											: ''
									}`}
									aria-label={`Grid cell ${rowIdx + 1},${colIdx + 1}`}
								>
									<AnimatePresence>
										{cell && (
											<motion.div
												initial={{ scale: 0, opacity: 0 }}
												animate={{ scale: 1, opacity: 1 }}
												exit={{ scale: 0, opacity: 0 }}
												transition={{ duration: 0.2 }}
												className='absolute inset-0'
											>
												<TilePattern tileId={cell} className='w-full h-full' />
											</motion.div>
										)}
									</AnimatePresence>
								</motion.button>
							)),
						)}
					</div>
				</div>

				{/* Палетка плиток */}
				<div className='flex flex-col'>
					<div className='border border-border-warm rounded-sm bg-cream flex-1'>
						<div className='bg-cream-dark border-b border-border-warm px-1.5 py-1.5 text-center'>
							<span className='font-heading text-[12px] font-bold tracking-wide text-ink'>
								DESIGN PALATE
							</span>
						</div>
						<div
							className='grid gap-3 p-3'
							style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
						>
							{PALETTE_TILES.map((tileId, i) => (
								<motion.button
									key={`${tileId}-${i}`}
									onClick={() =>
										dispatch(
											selectTile(selectedTile === tileId ? null : tileId),
										)
									}
									whileHover={{ scale: 1.08 }}
									whileTap={{ scale: 0.95 }}
									className={`aspect-square rounded-sm border-2 transition-all ${
										selectedTile === tileId
											? 'border-teal shadow-tile-hover scale-105'
											: 'border-border-warm hover:border-border-dark shadow-tile'
									}`}
									aria-label={`Select ${TILES.find((t) => t.id === tileId)?.name}`}
								>
									<TilePattern tileId={tileId} className='w-[48px] h-[48px]' />
								</motion.button>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Индикатор выбранной плитки */}
			<div className='mt-2 mx-auto flex items-center gap-2'>
				<AnimatePresence mode='wait'>
					{selectedTile &&
					selectedTile !== ('__erase__' as unknown as TileId) ? (
						<motion.div
							key={selectedTile}
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 10 }}
							className='flex items-center gap-2 bg-teal/10 border border-teal/30 rounded-sm px-2 py-1'
						>
							<TilePattern
								tileId={selectedTile}
								className='w-[48px] h-[48px] rounded-sm border border-teal/40'
							/>
							<span className='font-heading text-[14px] font-bold text-teal tracking-wide'>
								{TILES.find((t) => t.id === selectedTile)?.name.toUpperCase()} —
								PLACING
							</span>
						</motion.div>
					) : selectedTile === ('__erase__' as unknown as TileId) ? (
						<motion.div
							key='erase'
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 10 }}
							className='flex items-center gap-2 bg-terracotta/10 border border-terracotta/30 rounded-sm px-2 py-1'
						>
							<FaEraser size={12} className='text-terracotta' />
							<span className='font-heading text-[16px] font-bold text-terracotta tracking-wide'>
								ERASER — ACTIVE
							</span>
						</motion.div>
					) : (
						<motion.p
							key='hint'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className='font-heading text-[16px] text-ink-muted'
						>
							Select a tile from the palette to begin placing
						</motion.p>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default DesignTool;
