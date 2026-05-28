'use client';

import { motion } from 'framer-motion';

import { useAppSelector } from '@/hooks/redux';
import {
	calcGrandTotal,
	calcShipping,
	calcSubtotal,
	formatCurrency,
	SHIPPING_THRESHOLD,
} from '@/utils/calculations';

interface TotalsRowProps {
	label: string;
	value: string;
	isGrand?: boolean;
}

const TotalsRow = ({ label, value, isGrand }: TotalsRowProps) => {
	return (
		<div
			className={`flex items-center justify-end gap-2 ${isGrand ? 'mt-1' : ''}`}
		>
			<span
				className={`font-heading text-xs font-bold tracking-wide text-ink ${isGrand ? 'text-sm' : ''}`}
			>
				{label}:
			</span>
			<div className='flex items-center'>
				<span className='font-mono text-ink-muted text-xs'>[</span>
				<motion.span
					key={value}
					initial={{ opacity: 0.5 }}
					animate={{ opacity: 1 }}
					className={`font-mono font-semibold px-1 min-w-[72px] text-right ${
						isGrand ? 'text-md text-ink' : 'text-sm text-ink-light'
					}`}
				>
					{value}
				</motion.span>
				<span className='font-mono text-ink-muted text-xs'>]</span>
			</div>
		</div>
	);
};

interface OrderTotalsProps {
	compact?: boolean;
}

const OrderTotals = ({ compact = false }: OrderTotalsProps) => {
	const items = useAppSelector((state) => state.cart.items);
	const subtotal = calcSubtotal(items);
	const shipping = calcShipping(subtotal);
	const grandTotal = calcGrandTotal(subtotal, shipping);
	const freeShipping = subtotal > SHIPPING_THRESHOLD;

	return (
		<div
			className={`flex flex-col gap-1.5 ${compact ? '' : 'border-t-2 border-border-warm pt-3 mt-3'}`}
		>
			<TotalsRow label='SUBTOTAL' value={formatCurrency(subtotal)} />
			<TotalsRow
				label='SHIPPING'
				value={freeShipping ? '$0.00 ✓' : formatCurrency(shipping)}
			/>
			{!compact && freeShipping && (
				<p className='text-right font-heading text-[10px] text-teal font-semibold'>
					Free shipping on orders over $500!
				</p>
			)}
			<div className='border-t border-border-warm/60 pt-1.5 mt-0.5'>
				<TotalsRow
					label='GRAND TOTAL'
					value={formatCurrency(grandTotal)}
					isGrand
				/>
			</div>
		</div>
	);
};

export default OrderTotals;
