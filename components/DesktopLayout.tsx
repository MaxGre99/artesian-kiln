'use client';

import { motion } from 'framer-motion';

import CartTable from './CartTable';
import DesignTool from './DesignTool';
import OrderSummary from './OrderSummary';
import OrderTotals from './OrderTotals';

const DesktopLayout = () => {
	return (
		<div className='flex-1 flex flex-wrap items-start justify-center bg-cream rounded-2xl p-4 gap-5'>
			{/* LEFT: корзина */}
			<motion.div
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.4 }}
				className='flex flex-col'
			>
				<h3 className='tracking-widest text-ink mb-3 uppercase'>
					Shopping Cart &amp; Design Tool
				</h3>
				<CartTable />
				<div className='mt-4'>
					<OrderTotals />
				</div>
			</motion.div>

			{/* CENTER: дизайн-тулза */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4, delay: 0.1 }}
			>
				<DesignTool />
			</motion.div>

			{/* RIGHT: форма покупки */}
			<motion.div
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.4, delay: 0.2 }}
				className='flex flex-col flex-1 min-w-[210px] max-w-[370px]'
			>
				<h3 className='tracking-widest text-ink mb-3 uppercase border-b border-border-warm pb-2'>
					Order Summary
				</h3>
				<OrderSummary />
			</motion.div>
		</div>
	);
};

export default DesktopLayout;
