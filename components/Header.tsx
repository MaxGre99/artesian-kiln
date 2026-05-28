'use client';

import { motion } from 'framer-motion';
import { FaShoppingCart } from 'react-icons/fa';
import { FaRegUserCircle } from 'react-icons/fa';

import { useAppSelector } from '@/hooks/redux';

const NAV_LINKS_MOBILE = ['SHOP', 'COLLECTIONS', 'ABOUT US'];
const NAV_LINKS_DESKTOP = [
	'HOME',
	'SHOP',
	'COLLECTIONS',
	'ABOUT US',
	'FAQ',
	'GALLERY',
	'BLOG',
];

const Header = () => {
	const cartCount = useAppSelector((state) =>
		state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
	);

	return (
		<header className='bg-cream border-b-2 border-border-warm'>
			{/* Навбар */}
			<nav className='flex justify-between md:grid grid-cols-[1fr_auto_1fr] items-center gap-y-3 px-4 md:px-8 py-3 border-b border-border-warm/40'>
				{/* Left */}
				<div className='hidden md:block md:justify-self-start'>
					{/* Сюда, в случае чего, можно будет вставит лого*/}
				</div>
				{/* Center */}
				<div className='md:order-2 md:col-span-1 justify-self-center'>
					{/* Мобильный навбар */}
					<div className='flex md:hidden gap-5 flex-wrap justify-center'>
						{NAV_LINKS_MOBILE.map((link) => (
							<a
								key={link}
								href='#'
								className='text-ink font-heading text-sm font-semibold tracking-wide hover:text-teal transition-colors'
							>
								{link}
							</a>
						))}
					</div>

					{/* Десктоп навбар */}
					<div className='hidden md:flex gap-6 flex-wrap justify-center'>
						{NAV_LINKS_DESKTOP.map((link) => (
							<a
								key={link}
								href='#'
								className='text-ink font-heading text-md font-medium tracking-wide hover:text-teal transition-colors'
							>
								{link}
							</a>
						))}
					</div>
				</div>

				{/* Right */}
				<div className='order-2 md:order-3 justify-self-end flex items-center gap-3'>
					<button
						className='relative p-1.5 hover:text-teal transition-colors'
						aria-label='Cart'
					>
						<FaShoppingCart size={24} className='text-ink' />
						{cartCount > 0 && (
							<motion.span
								key={cartCount}
								initial={{ scale: 0.7 }}
								animate={{ scale: 1 }}
								className='absolute -top-1 -right-1 bg-teal text-white text-xs rounded-full w-4 h-4 flex items-center justify-center pt-1 font-mono font-bold'
							>
								{cartCount > 9 ? '9+' : cartCount}
							</motion.span>
						)}
					</button>

					<button
						className='p-1.5 hover:text-teal transition-colors'
						aria-label='Account'
					>
						<FaRegUserCircle size={24} className='text-ink' />
					</button>

					<button className='hidden md:flex items-center gap-1.5 bg-ink text-cream font-heading text-sm font-semibold px-3 py-1.5 rounded-sm hover:bg-teal-dark transition-colors tracking-wide'>
						A. Smith
					</button>

					<button className='md:hidden bg-ink text-cream font-heading text-xs font-semibold px-3 py-1.5 rounded-sm hover:bg-teal-dark transition-colors tracking-wide'>
						LOG IN
					</button>
				</div>
			</nav>
		</header>
	);
};

export default Header;
