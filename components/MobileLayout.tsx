'use client';

import { motion } from 'framer-motion';
import { FaShieldHeart } from 'react-icons/fa6';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setErrors, setSubmitted } from '@/store/formSlice';
import { validateForm } from '@/utils/validation';

import CartTable from './CartTable';
import CustomerForm, { ProjectNotes } from './CustomerForm';
import OrderTotals from './OrderTotals';
import PaymentSection from './PaymentSection';

const MobileLayout = () => {
	const dispatch = useAppDispatch();
	const form = useAppSelector((state) => state.form);
	const submitted = useAppSelector((state) => state.form.submitted);

	const handleSubmit = () => {
		const errors = validateForm(form);
		if (Object.keys(errors).length > 0) {
			dispatch(setErrors(errors));
			window.scrollTo({ top: 0, behavior: 'smooth' });
			return;
		}
		dispatch(setSubmitted(true));
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	if (submitted) {
		return (
			<div className='flex-1 flex flex-col items-center justify-center p-8 text-center'>
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
				>
					<div className='w-16 h-16 rounded-full bg-teal flex items-center justify-center mb-4 shadow-tile mx-auto'>
						<FaShieldHeart size={32} className='text-white' />
					</div>
					<h3 className='tracking-widest text-ink mb-2'>ORDER PLACED!</h3>
					<p className='font-heading text-sm text-ink-muted mb-4'>
						Thank you, {form.name || 'valued customer'}!<br />
						Your tiles are being prepared.
					</p>
					<button
						onClick={() => dispatch(setSubmitted(false))}
						className='font-heading text-xs text-teal hover:underline'
					>
						PLACE ANOTHER ORDER
					</button>
				</motion.div>
			</div>
		);
	}

	return (
		<div className='flex-1 px-4 py-6 space-y-6'>
			{/* Section: пользовательская информация */}
			<motion.section
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				className='border border-border-warm rounded-sm p-4 bg-cream'
			>
				<CustomerForm />
			</motion.section>

			{/* Section: корзина */}
			<motion.section
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
				<CartTable />
				<div className='border border-border-warm rounded-sm p-3 mt-3 bg-cream'>
					<OrderTotals />
				</div>
			</motion.section>

			{/* Section: оплата */}
			<motion.section
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
			>
				<PaymentSection />
			</motion.section>

			{/* Section: доп.записка */}
			<motion.section
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.35 }}
				className='border border-border-warm rounded-sm p-4 bg-cream'
			>
				<ProjectNotes />
			</motion.section>

			{/* Кнопка сабмита */}
			<motion.div
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.4 }}
				className='pb-6'
			>
				<button
					onClick={handleSubmit}
					className='w-full py-4 bg-ink hover:bg-teal-dark text-cream font-heading text-sm font-black tracking-widest rounded-sm shadow-tile transition-all flex items-center justify-center gap-2'
				>
					<FaShieldHeart size={16} />
					PLACE SECURE ORDER
				</button>
			</motion.div>
		</div>
	);
};

export default MobileLayout;
