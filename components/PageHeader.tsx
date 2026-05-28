'use client';

import { motion } from 'framer-motion';

import FifthTileIcon from '@/assets/FIFTH_TILE.svg';
import FirstTileIcon from '@/assets/FIRST_TILE.svg';
import FourthTileIcon from '@/assets/FOURTH_TILE.svg';
import HouseIcon from '@/assets/HOUSE.svg';
import OvenIcon from '@/assets/OVEN.svg';
import SecondTileIcon from '@/assets/SECOND_TILE.svg';
import SixthTileIcon from '@/assets/SIXTH_TILE.svg';
import ThirdTileIcon from '@/assets/THIRD_TILE.svg';

const DECORATIVE_TITLE_TILES = [
	FirstTileIcon,
	SecondTileIcon,
	ThirdTileIcon,
	FourthTileIcon,
	FifthTileIcon,
	SixthTileIcon,
];

const PageHeader = () => {
	return (
		<div className='px-4 md:px-8 py-4 text-center flex items-center justify-center gap-6 bg-cream rounded-2xl w-fit mx-auto'>
			<HouseIcon className='hidden md:block h-[84px]' />
			<div className='flex flex-col'>
				<motion.h1
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='font-heading text-2xl md:text-5xl font-black tracking-widest text-ink uppercase leading-none'
				>
					CERAMIC TILE ORDER FORM
				</motion.h1>

				{/* Декоративные плиточки с тайтлом */}
				<div className='flex items-center justify-center gap-2 mt-2'>
					<div className='flex md:gap-1.5'>
						{DECORATIVE_TITLE_TILES.slice(0, 3).map((Icon, i) => (
							<Icon key={i} className='w-8 h-8 md:w-12 md:h-12' />
						))}
					</div>
					<div className='flex items-center gap-2 md:px-4'>
						<span className='font-heading text-xs md:text-xl font-bold tracking-[0.2em] text-ink'>
							THE ARTISAN KILN
						</span>
					</div>
					<div className='flex md:gap-1.5'>
						{DECORATIVE_TITLE_TILES.slice(3).map((Icon, i) => (
							<Icon key={i} className='w-8 h-8 md:w-12 md:h-12' />
						))}
					</div>
				</div>
			</div>

			<OvenIcon className='hidden md:block h-[84px]' />
		</div>
	);
};

export default PageHeader;
