'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { updateField } from '@/store/formSlice';

interface FieldProps {
	label: string;
	field: 'name' | 'phone' | 'email' | 'address' | 'projectNotes';
	type?: string;
	placeholder?: string;
	fullWidth?: boolean;
}

const FormField = ({
	label,
	field,
	type = 'text',
	placeholder = '',
	fullWidth = false,
}: FieldProps) => {
	const dispatch = useAppDispatch();
	const value = useAppSelector((state) => state.form[field]);
	const error = useAppSelector(
		(state) => state.form.errors[field as keyof typeof state.form.errors],
	);

	return (
		<div className={`flex flex-col gap-0.5 ${fullWidth ? 'col-span-2' : ''}`}>
			<label className='font-heading text-[10px] md:text-xs font-bold tracking-widest text-ink'>
				{label}:
			</label>
			<div className='relative'>
				<input
					type={type}
					value={value}
					onChange={(e) =>
						dispatch(updateField({ field, value: e.target.value }))
					}
					placeholder={placeholder}
					className={`w-full bg-transparent border-b ${
						error ? 'border-terracotta' : 'border-border-dark'
					} px-0 py-0.5 font-mono text-sm text-ink outline-none focus:border-teal placeholder:text-ink-muted/40 transition-colors`}
				/>
			</div>
			{error && (
				<span className='font-mono text-[10px] text-terracotta'>{error}</span>
			)}
		</div>
	);
};

const CustomerForm = () => {
	return (
		<div className='flex flex-col gap-3 md:gap-4'>
			<div className='grid grid-cols-2 gap-x-6 gap-y-3'>
				<FormField
					label='CUSTOMER NAME'
					field='name'
					fullWidth
					placeholder='Full name'
				/>
				<FormField
					label='PHONE'
					field='phone'
					type='tel'
					placeholder='(555) 000-0000'
				/>
				<FormField
					label='EMAIL'
					field='email'
					type='email'
					placeholder='you@example.com'
				/>
				<FormField
					label='SHIPPING ADDRESS'
					field='address'
					fullWidth
					placeholder='Street, City, State, ZIP'
				/>
			</div>
		</div>
	);
};

export const ProjectNotes = () => {
	const dispatch = useAppDispatch();
	const value = useAppSelector((state) => state.form.projectNotes);

	return (
		<div className='flex flex-col gap-1'>
			<label className='font-heading text-[10px] md:text-xs font-bold tracking-widest text-ink flex items-center gap-1.5'>
				PROJECT NAME / NOTES:
			</label>
			<input
				type='text'
				value={value}
				onChange={(e) =>
					dispatch(
						updateField({ field: 'projectNotes', value: e.target.value }),
					)
				}
				className='w-full bg-transparent border-b border-border-dark px-0 py-0.5 font-mono text-sm text-ink outline-none focus:border-teal placeholder:text-ink-muted/40 transition-colors'
				placeholder='Project name or special instructions...'
			/>
			<div className='border-b border-border-dark/40 mt-1' />
		</div>
	);
};

export default CustomerForm;
