'use client';

import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { BsBank2 } from 'react-icons/bs';
import {
	FaApplePay,
	FaCcMastercard,
	FaCcVisa,
	FaPaypal,
	FaRegCreditCard,
} from 'react-icons/fa6';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setPaymentMethod, updateField } from '@/store/formSlice';
import { PaymentMethod } from '@/types';
import { formatCardNumber, formatExpiration } from '@/utils/validation';

interface PaymentOptionProps {
	value: PaymentMethod;
	label: string;
	icon: React.ReactNode;
}

const PaymentOption = ({ value, label, icon }: PaymentOptionProps) => {
	const dispatch = useAppDispatch();
	const selected = useAppSelector(
		(state) => state.form.paymentMethod === value,
	);

	return (
		<button
			onClick={() => dispatch(setPaymentMethod(value))}
			className={`flex flex-col items-center justify-center gap-1.5 p-3 border-2 rounded-sm transition-all ${
				selected
					? 'border-teal bg-teal/5 shadow-tile'
					: 'border-border-warm bg-cream hover:border-border-dark hover:bg-cream-dark'
			}`}
		>
			<div className='flex items-center gap-1.5'>
				<div
					className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
						selected ? 'border-teal' : 'border-border-dark'
					}`}
				>
					{selected && <div className='w-2 h-2 rounded-full bg-teal' />}
				</div>
				{icon}
			</div>
			<span className='font-heading text-[10px] font-bold tracking-wide text-ink text-center leading-tight'>
				{label}
			</span>
		</button>
	);
};

const PaymentSection = () => {
	const dispatch = useAppDispatch();
	const { paymentMethod, cardNumber, expiration, cvv, errors } = useAppSelector(
		(state) => state.form,
	);

	return (
		<div>
			<div className='border border-border-warm rounded-sm mb-3'>
				<div className='bg-cream-dark border-b border-border-warm px-3 py-2'>
					<span className='font-heading text-xs font-bold tracking-widest text-ink'>
						SELECT PAYMENT METHOD:
					</span>
				</div>
				<div className='p-3'>
					<div className='grid grid-cols-2 gap-2 mb-3'>
						<PaymentOption
							value='credit'
							label='CREDIT/DEBIT CARD'
							icon={<FaRegCreditCard size={18} className='text-ink' />}
						/>
						<PaymentOption
							value='paypal'
							label='PAYPAL'
							icon={<FaPaypal size={18} className='text-ink' />}
						/>
						<PaymentOption
							value='applepay'
							label='APPLE PAY'
							icon={<FaApplePay size={32} className='text-ink' />}
						/>
						<PaymentOption
							value='bank'
							label='BANK TRANSFER'
							icon={<BsBank2 size={18} className='text-ink' />}
						/>
					</div>

					{/* Форма кредитки */}
					<AnimatePresence>
						{paymentMethod === 'credit' && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
								transition={{ duration: 0.25 }}
							>
								<div className='border border-border-warm rounded-sm p-3 bg-cream space-y-2.5'>
									{/* Лого кредиток */}
									<div className='flex items-center gap-2'>
										<div className='flex gap-1'>
											<FaCcVisa size={32} className='text-ink' />
											<FaCcMastercard size={32} className='text-ink' />
										</div>
									</div>

									{/* Номер карты */}
									<div>
										<label className='font-heading text-[14px] font-bold tracking-wide text-ink'>
											CARD NUMBER
										</label>
										<input
											type='text'
											inputMode='numeric'
											value={cardNumber}
											onChange={(e) =>
												dispatch(
													updateField({
														field: 'cardNumber',
														value: formatCardNumber(e.target.value),
													}),
												)
											}
											placeholder='1234 5678 9012 3456'
											maxLength={19}
											className={`w-full mt-0.5 bg-cream-dark border ${
												errors.cardNumber
													? 'border-terracotta'
													: 'border-border-warm'
											} rounded-sm px-2 py-1.5 font-mono text-sm text-ink outline-none focus:border-teal transition-colors`}
										/>
										{errors.cardNumber && (
											<span className='font-mono text-[10px] text-terracotta'>
												{errors.cardNumber}
											</span>
										)}
									</div>

									{/* Срок действия + CVV */}
									<div className='grid grid-cols-2 gap-2'>
										<div>
											<label className='font-heading text-[14px] font-bold tracking-wide text-ink'>
												EXPIRATION
											</label>
											<input
												type='text'
												inputMode='numeric'
												value={expiration}
												onChange={(e) =>
													dispatch(
														updateField({
															field: 'expiration',
															value: formatExpiration(e.target.value),
														}),
													)
												}
												placeholder='MM/YY'
												maxLength={5}
												className={`w-full mt-0.5 bg-cream-dark border ${
													errors.expiration
														? 'border-terracotta'
														: 'border-border-warm'
												} rounded-sm px-2 py-1.5 font-mono text-sm text-ink outline-none focus:border-teal transition-colors`}
											/>
											{errors.expiration && (
												<span className='font-mono text-[10px] text-terracotta'>
													{errors.expiration}
												</span>
											)}
										</div>
										<div>
											<label className='font-heading text-[14px] font-bold tracking-wide text-ink'>
												CVV
											</label>
											<input
												type='text'
												inputMode='numeric'
												value={cvv}
												onChange={(e) =>
													dispatch(
														updateField({
															field: 'cvv',
															value: e.target.value
																.replace(/\D/g, '')
																.slice(0, 4),
														}),
													)
												}
												placeholder='•••'
												maxLength={4}
												className={`w-full mt-0.5 bg-cream-dark border ${
													errors.cvv
														? 'border-terracotta'
														: 'border-border-warm'
												} rounded-sm px-2 py-1.5 font-mono text-sm text-ink outline-none focus:border-teal transition-colors`}
											/>
											{errors.cvv && (
												<span className='font-mono text-[10px] text-terracotta'>
													{errors.cvv}
												</span>
											)}
										</div>
									</div>
								</div>
							</motion.div>
						)}

						{paymentMethod === 'paypal' && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
								className='border border-border-warm rounded-sm p-4 bg-cream text-center'
							>
								<p className='font-heading text-md text-ink-muted'>
									You will be redirected to PayPal to complete your payment
									securely.
								</p>
							</motion.div>
						)}

						{paymentMethod === 'applepay' && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
								className='border border-border-warm rounded-sm p-4 bg-cream text-center'
							>
								<p className='font-heading text-md text-ink-muted'>
									Complete your purchase using Face ID, Touch ID, or your device
									passcode.
								</p>
							</motion.div>
						)}

						{paymentMethod === 'bank' && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
								className='border border-border-warm rounded-sm p-4 bg-cream'
							>
								<p className='font-heading text-sm text-ink font-bold mb-1'>
									BANK TRANSFER DETAILS
								</p>
								<div className='space-y-0.5 font-mono text-sm text-ink-light'>
									<p>Bank: Artisan Kiln National Bank</p>
									<p>Account: 0012-3456-7890</p>
									<p>Routing: 021-000-021</p>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
};

export default PaymentSection;
