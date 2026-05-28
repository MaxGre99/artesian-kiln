'use client';

import React from 'react';

const Footer = () => {
	return (
		<footer>
			<div className='px-4 md:px-8 py-4 bg-cream rounded-2xl mx-auto w-fit'>
				{/* Desktop links */}
				<div className='hidden md:flex items-center justify-center gap-4 mb-2'>
					{[
						'TERMS OF SERVICE',
						'PRIVACY POLICY',
						'SHIPPING INFO',
						'CONTACT US',
					].map((link, i) => (
						<React.Fragment key={link}>
							<a
								href='#'
								className='font-heading text-sm font-semibold text-ink-muted hover:text-ink transition-colors tracking-wide'
							>
								{link}
							</a>
							{i < 3 && <span className='text-border-warm'>|</span>}
						</React.Fragment>
					))}
				</div>

				{/* Mobile links */}
				<div className='flex md:hidden items-center justify-center gap-6 mb-2'>
					{['TERMS', 'CONTACT'].map((link) => (
						<a
							key={link}
							href='#'
							className='font-heading text-sm font-semibold text-ink-muted hover:text-ink transition-colors tracking-wide'
						>
							{link}
						</a>
					))}
				</div>

				<p className='text-center font-mono text-[12px] text-ink-muted'>
					© 2026 THE ARTISAN KILN. ALL RIGHTS RESERVED.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
