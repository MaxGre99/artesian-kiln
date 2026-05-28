import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';

import { TILES } from '@/data/tiles';
import { useAppDispatch } from '@/hooks/redux';
import { addItem } from '@/store/cartSlice';
import { TileId } from '@/types';
import { formatCurrency } from '@/utils/calculations';

import { TilePattern } from './CollAndTilePattern';

interface AddTileModalProps {
	onClose: () => void;
	presentIds: TileId[];
}

const AddTileModal = ({ onClose, presentIds }: AddTileModalProps) => {
	const dispatch = useAppDispatch();
	const available = TILES.filter((t) => !presentIds.includes(t.id));

	if (available.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0, scale: 0.92 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.92 }}
				className='absolute z-20 bottom-14 left-0 right-0 mx-4 bg-cream border-2 border-border-warm rounded-sm shadow-card p-4 text-center'
			>
				<p className='font-heading text-sm text-ink-light'>
					All tile collections are already in your cart.
				</p>
				<button
					onClick={onClose}
					className='mt-2 font-heading text-xs font-semibold text-teal hover:underline'
				>
					CLOSE
				</button>
			</motion.div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.92, y: 10 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.92, y: 10 }}
			className='absolute z-20 bottom-14 left-0 right-0 mx-4 bg-cream border-2 border-border-warm rounded-sm shadow-card p-4'
		>
			<p className='font-heading text-xs font-bold text-ink mb-3 tracking-wide'>
				SELECT TILE COLLECTION
			</p>
			<div className='flex flex-col gap-2'>
				{available.map((tile) => (
					<button
						key={tile.id}
						onClick={() => {
							dispatch(addItem(tile.id));
							onClose();
						}}
						className='flex items-center gap-3 p-2 border border-border-warm/60 rounded-sm hover:bg-cream-dark hover:border-teal transition-all group'
					>
						<TilePattern
							tileId={tile.id}
							className='w-10 h-10 rounded-sm border border-border-warm shadow-tile'
						/>
						<div className='text-left flex-1'>
							<p className='font-heading text-sm font-bold text-ink'>
								{tile.name}
							</p>
							<p className='font-mono text-xs text-ink-muted'>
								{formatCurrency(tile.price)}/sq.ft
							</p>
						</div>
						<FaPlus
							size={16}
							className='text-teal opacity-0 group-hover:opacity-100 transition-opacity'
						/>
					</button>
				))}
			</div>
			<button
				onClick={onClose}
				className='mt-3 w-full text-center font-heading text-xs font-semibold text-ink-muted hover:text-ink transition-colors'
			>
				CANCEL
			</button>
		</motion.div>
	);
};

export default AddTileModal;
