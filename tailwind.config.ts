import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				cream: {
					DEFAULT: '#f5f0e8',
					dark: '#e8dfc8',
					border: '#d4c9b0',
				},
				parchment: '#ede5d0',
				ink: {
					DEFAULT: '#2c2416',
					light: '#5c4a32',
					muted: '#8a7050',
				},
				teal: {
					DEFAULT: '#4a7c6f',
					dark: '#3a6259',
					light: '#6a9c8f',
				},
				terracotta: {
					DEFAULT: '#c4603a',
					light: '#d4724a',
					dark: '#a04828',
				},
				gold: {
					DEFAULT: '#d4a017',
					light: '#e8b830',
					dark: '#b08010',
				},
				navy: {
					DEFAULT: '#2a4a8a',
					light: '#3d6ab0',
				},
				fern: {
					DEFAULT: '#3d7a35',
					light: '#5a9a50',
					bg: '#e0ecd8',
				},
				wave: {
					DEFAULT: '#1e4a8c',
					light: '#2d6ab0',
					bg: '#d4e8f5',
				},
				border: {
					warm: '#c4a882',
					dark: '#8a7050',
				},
			},
			fontFamily: {
				heading: ['var(--font-oswald)', 'Oswald', 'sans-serif'],
				body: ['var(--font-oswald)', 'Oswald', 'sans-serif'],
				mono: [
					'var(--font-courier)',
					'Courier Prime',
					'Courier New',
					'monospace',
				],
			},
			backgroundImage: {
				grain:
					"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
			},
			boxShadow: {
				tile: '2px 2px 0px rgba(44,36,22,0.25)',
				'tile-hover': '3px 3px 0px rgba(44,36,22,0.35)',
				card: '0 2px 8px rgba(44,36,22,0.12)',
				'inset-warm': 'inset 0 2px 4px rgba(44,36,22,0.08)',
			},
			borderWidth: {
				'1.5': '1.5px',
			},
		},
	},
	plugins: [],
};

export default config;
