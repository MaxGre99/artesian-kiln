import { useState } from 'react';

import { useAppDispatch } from '@/hooks/redux';
import { updateQuantity } from '@/store/cartSlice';
import { TileId } from '@/types';

interface QuantityInputProps {
	id: TileId;
	quantity: number;
}

const QuantityInput = ({ id, quantity }: QuantityInputProps) => {
	const dispatch = useAppDispatch();
	const [editing, setEditing] = useState(false);
	const [draft, setDraft] = useState('');

	const handleBlur = () => {
		setEditing(false);
		const val = parseInt(draft, 10);
		if (!isNaN(val)) dispatch(updateQuantity({ id, quantity: val }));
	};

	return (
		<div className='flex items-center'>
			<span className='font-mono text-ink-muted text-sm mr-0.5'>[</span>
			{editing ? (
				<input
					autoFocus
					className='w-10 text-center font-mono text-sm bg-cream border-b border-border-dark outline-none'
					value={draft}
					onChange={(e) => setDraft(e.target.value.replace(/\D/g, ''))}
					onBlur={handleBlur}
					onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
				/>
			) : (
				<button
					onClick={() => {
						setDraft(String(quantity));
						setEditing(true);
					}}
					className='w-10 text-center font-mono text-sm hover:text-teal transition-colors font-semibold'
				>
					{quantity}
				</button>
			)}
			<span className='font-mono text-ink-muted text-sm ml-0.5'>]</span>
		</div>
	);
};

export default QuantityInput;
