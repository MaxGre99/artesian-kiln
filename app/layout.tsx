import type { Metadata } from 'next';
import { Oswald } from 'next/font/google';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Providers from '@/components/Providers';

import './globals.css';

const title = 'Ceramic Tile Order Form — The Artisan Kiln';

const description =
	'Order handcrafted ceramic tiles from The Artisan Kiln. Browse our collections and create your custom tile design.';

export const metadata: Metadata = {
	title,
	description,
	openGraph: {
		type: 'website',
		locale: 'ru_RU',
		siteName: 'Artesian Kiln',
		title,
		description,
		images: [
			{
				url: '/og-default.png',
				width: 1200,
				height: 630,
				alt: 'Artesian Kiln',
			},
		],
	},

	twitter: {
		card: 'summary_large_image',
		title,
		description,
		images: ['/og-default.png'],
	},

	icons: {
		icon: [
			{ url: '/favicon.ico' },
			{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
		],
		apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
	},
};

const oswald = Oswald({
	weight: ['400', '500', '600', '700'],
	variable: '--font-oswald',
	display: 'swap',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className='w-full'>
			<body
				className={`${oswald.variable} antialiased font-oswald min-w-full bg-cream flex flex-col`}
			>
				<Providers>
					<Header />

					<div className="flex-1 bg-[url('/MOBILE_BG_CLEAR.png')] md:bg-[url('/DESKTOP_BG_CLEAR.png')] bg-cover w-full flex flex-col justify-start">
						<main className='w-full max-w-[1440px] mx-auto h-fit'>
							{children}
						</main>

						<Footer />
					</div>
				</Providers>
			</body>
		</html>
	);
}
