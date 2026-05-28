'use client';

import { motion } from 'framer-motion';
import { FaShieldHeart } from 'react-icons/fa6';

import { TILE_MAP } from '@/data/tiles';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setErrors, setSubmitted } from '@/store/formSlice';
import { calcSubtotal, formatCurrency } from '@/utils/calculations';
import { validateForm } from '@/utils/validation';

import CustomerForm, { ProjectNotes } from './CustomerForm';
import OrderTotals from './OrderTotals';
import PaymentSection from './PaymentSection';

const OrderSummary = () => {
	const dispatch = useAppDispatch();
	const form = useAppSelector((state) => state.form);
	const items = useAppSelector((state) => state.cart.items);
	const submitted = useAppSelector((state) => state.form.submitted);

	const handleSubmit = () => {
		const errors = validateForm(form);
		if (Object.keys(errors).length > 0) {
			dispatch(setErrors(errors));
			return;
		}
		dispatch(setSubmitted(true));
	};

	if (submitted) {
		const subtotal = calcSubtotal(items);
		return (
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				className='flex flex-col items-center justify-center h-full text-center p-6'
			>
				<div className='w-14 h-14 rounded-full bg-teal flex items-center justify-center mb-4 shadow-tile'>
					<FaShieldHeart size={28} className='text-white' />
				</div>
				<h3 className='font-heading text-2xl font-black tracking-widest text-ink mb-2'>
					ORDER PLACED!
				</h3>
				<p className='font-heading text-sm text-ink-light tracking-wide mb-4'>
					Thank you, {form.name || 'valued customer'}!<br />
					Your ceramic tiles are being prepared.
				</p>
				<div className='border border-border-warm rounded-sm p-3 w-full text-left space-y-1 mb-4'>
					{items
						.filter((i) => i.quantity > 0)
						.map((item) => {
							const tile = TILE_MAP[item.id];
							return tile ? (
								<div
									key={item.id}
									className='flex justify-between font-mono text-xs text-ink-light'
								>
									<span>
										{tile.name} × {item.quantity} sq.ft
									</span>
									<span>{formatCurrency(tile.price * item.quantity)}</span>
								</div>
							) : null;
						})}
					<div className='border-t border-border-warm/60 pt-1 flex justify-between font-heading text-sm font-bold text-ink'>
						<span>TOTAL</span>
						<span>{formatCurrency(subtotal)}</span>
					</div>
				</div>
				<button
					onClick={() => dispatch(setSubmitted(false))}
					className='font-heading text-xs text-teal hover:underline tracking-wide'
				>
					PLACE ANOTHER ORDER
				</button>
			</motion.div>
		);
	}

	return (
		<div className='flex flex-col h-full'>
			<div className='border-b border-border-warm pb-3 mb-4'>
				<CustomerForm />
				<div className='mt-3'>
					<ProjectNotes />
				</div>
			</div>

			<div className='mb-4'>
				<OrderTotals compact />
			</div>

			<div className='mb-4'>
				<PaymentSection />
			</div>

			{/* Кнопка заказа */}
			<button
				onClick={handleSubmit}
				className='w-full py-3.5 bg-ink hover:bg-teal-dark text-cream font-heading text-sm font-black tracking-widest rounded-sm shadow-tile transition-all hover:shadow-tile-hover active:translate-y-px active:shadow-none flex items-center justify-center gap-2'
			>
				<FaShieldHeart size={16} />
				PLACE SECURE ORDER
			</button>

			<p className='text-center font-mono text-[12px] text-ink-muted mt-2'>
				Your payment information is encrypted and secure.
			</p>
		</div>
	);
};

export default OrderSummary;
