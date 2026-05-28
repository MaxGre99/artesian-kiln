'use client';

import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { FaPlus, FaRegTrashAlt } from 'react-icons/fa';

import AddTileIcon from '@/assets/ADD_TILE.svg';
import HandWithTileIcon from '@/assets/HAND.svg';
import { TILE_MAP } from '@/data/tiles';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { incrementQuantity, removeItem } from '@/store/cartSlice';
import { formatCurrency } from '@/utils/calculations';

import AddTileModal from './AddTileModal';
import { CollectionPattern, TilePattern } from './CollAndTilePattern';
import QuantityInput from './QuantityInput';

const CartTable = () => {
	const dispatch = useAppDispatch();
	const items = useAppSelector((state) => state.cart.items);
	const [showAddModal, setShowAddModal] = useState(false);

	return (
		<div className='relative'>
			{/* Табличка */}
			<div className='border-2 border-border-warm rounded-sm overflow-x-auto'>
				<table className='w-full border-collapse overflow-hidden'>
					{/* Заголовок таблички */}
					<thead className='bg-cream-dark border-b-2 border-border-warm'>
						<tr>
							<th className='px-2 py-2.5 font-heading text-[10px] md:text-xs font-bold text-ink tracking-wide text-center border-r last:border-r-0 border-border-warm/60 w-[20%]'>
								TILE COLLECTION
							</th>
							<th className='px-2 py-2.5 font-heading text-[10px] md:text-xs font-bold text-ink tracking-wide text-center border-r last:border-r-0 border-border-warm/60 w-[15%]'>
								ITEM
							</th>
							<th className='px-2 py-2.5 font-heading text-[10px] md:text-xs font-bold text-ink tracking-wide text-center border-r last:border-r-0 border-border-warm/60 w-[13%]'>
								QTY (sq.ft.)
							</th>
							<th className='px-2 py-2.5 font-heading text-[10px] md:text-xs font-bold text-ink tracking-wide text-center border-r last:border-r-0 border-border-warm/60 w-[13%]'>
								UNIT PRICE ($)
							</th>
							<th className='px-2 py-2.5 font-heading text-[10px] md:text-xs font-bold text-ink tracking-wide text-center w-[12%]'>
								ACTIONS
							</th>
						</tr>
					</thead>

					{/* Строки плиток в корзинеЪ */}
					<tbody>
						<AnimatePresence>
							{items.map((item, idx) => {
								const tile = TILE_MAP[item.id];
								if (!tile) return null;
								return (
									<motion.tr
										key={item.id}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: 20, height: 0 }}
										transition={{ duration: 0.25, delay: idx * 0.05 }}
										className='border-b border-border-warm/50 last:border-b-0 bg-cream hover:bg-cream-dark/40 transition-colors'
									>
										{/* Коллекция с названием*/}
										<td className='px-2 py-3 border-r border-border-warm/40 align-middle'>
											<div className='flex flex-col items-center justify-center gap-1.5'>
												<CollectionPattern
													tileId={item.id}
													className='w-10 h-10 md:w-12 md:h-12 rounded-sm border border-border-warm shadow-tile'
												/>
												<span className='font-heading text-[9px] md:text-[10px] font-bold text-ink text-center tracking-wide leading-tight'>
													{tile.name.toUpperCase()}
												</span>
											</div>
										</td>

										{/* Сам айтем */}
										<td className='px-2 py-3 border-r border-border-warm/40 align-middle'>
											<div className='flex items-center justify-center'>
												<TilePattern
													tileId={item.id}
													className='w-14 h-14 md:w-16 md:h-16 rounded-sm border border-border-warm shadow-tile'
												/>
											</div>
										</td>

										{/* Кол-во */}
										<td className='px-2 py-3 border-r border-border-warm/40 align-middle'>
											<div className='flex items-center justify-center'>
												<QuantityInput id={item.id} quantity={item.quantity} />
											</div>
										</td>

										{/* Цена за шт. */}
										<td className='px-2 py-3 border-r border-border-warm/40 align-middle'>
											<div className='flex items-center justify-center'>
												<span className='font-mono text-ink-muted text-xs mr-0.5'>
													[
												</span>
												<span className='font-mono text-sm font-semibold text-ink'>
													{formatCurrency(tile.price)}
												</span>
												<span className='font-mono text-ink-muted text-xs ml-0.5'>
													]
												</span>
											</div>
										</td>

										{/* Действия */}
										<td className='px-2 py-3 align-middle'>
											<div className='flex items-center justify-center gap-2'>
												<button
													onClick={() => dispatch(incrementQuantity(item.id))}
													className='w-7 h-7 bg-teal hover:bg-teal-dark text-white rounded-sm flex items-center justify-center transition-colors shadow-tile active:shadow-none active:translate-y-px'
													aria-label='Add'
												>
													<FaPlus size={14} />
												</button>
												<button
													onClick={() => dispatch(removeItem(item.id))}
													className='w-7 h-7 bg-terracotta hover:bg-terracotta-dark text-white rounded-sm flex items-center justify-center transition-colors shadow-tile active:shadow-none active:translate-y-px'
													aria-label='Remove'
												>
													<FaRegTrashAlt size={12} />
												</button>
											</div>
										</td>
									</motion.tr>
								);
							})}
						</AnimatePresence>
					</tbody>
				</table>

				{items.length === 0 && (
					<div className='py-8 text-center'>
						<p className='font-heading text-sm text-ink-muted'>
							Your cart is empty. Add a tile collection below.
						</p>
					</div>
				)}
			</div>

			{/* Добавить плитку*/}
			<div className='mt-3 flex justify-between items-start'>
				<HandWithTileIcon className='h-[96px]' />
				<button
					onClick={() => setShowAddModal((prev) => !prev)}
					className='flex items-center gap-2 px-4 py-2.5 border-2 border-border-warm bg-cream hover:bg-cream-dark hover:border-teal transition-all rounded-sm shadow-tile active:shadow-none active:translate-y-px'
				>
					<span className='w-6 h-6 bg-teal text-white rounded-sm flex items-center justify-center'>
						<FaPlus size={14} />
					</span>
					<AddTileIcon className='h-[24px]' />
					<span className='font-heading text-xs font-bold text-ink tracking-wide'>
						ADD NEW TILE TO CART
					</span>
				</button>
			</div>

			{/* Модалка от Добавить плитку */}
			<AnimatePresence>
				{showAddModal && (
					<AddTileModal
						onClose={() => setShowAddModal(false)}
						presentIds={items.map((i) => i.id)}
					/>
				)}
			</AnimatePresence>
		</div>
	);
};

export default CartTable;
