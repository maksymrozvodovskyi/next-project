/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			screens: {
				'3xl': '1920px',
			},
			maxWidth: {
				'8xl': '1408px',
				'9xl': '1536px',
				'10xl': '1600px',
			},
		},
	},
	plugins: [],
}
