/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
	darkMode: "class",
  theme: {
    extend: {},
		transitionDuration: {
			'moa-base': '500ms'
		},
		colors: {
			'moa-light-base': '#343A3F',
			'moa-light-base-hover': '#67AEFF',
			'moa-dark-base': '#D1D1D1',
			'moa-dark-base-hover': '#3884DA',
			'moa-white': '#FFFFFF',
			'moa-light-line': '#D1D1D1',
			'moa-light-line-hover': '#67AEFF',
			'moa-dark-line': '#343A3F',
			'moa-dark-line-hover': '#3884DA',

			'moa-gray': {
				100: '#D1D1D1',
			},
			'moa-blue': {
				100: '#67AEFF',
				200: '#4B9AF4',
				300: '#3884DA',
			},
			'moa-mono': {
				100: '#5F666B',
				200: '#1E2429',
				300: '#343A3F',
			}
		},
		fontFamily: {
			'moa-primary': "Pretendard"
		},
		fontSize: {
			'moa-3xl': ['2rem', {
				lineHeight: '2.125rem',
				letterSpacing: '-0.04rem',
				fontWeight: '400'
			}],
			'moa-h1': ['0.9rem', {
				lineHeight: '0.875rem',
				letterSpacing: '-0.04rem',
				fontWeight: 'bold'
			}],
			'moa-body1': ['0.9rem', {
				lineHeight: '1.1rem',
				letterSpacing: '-0.04rem',
				fontWeight: '400'
			}],
			'moa-body2': ['0.75rem', {
				lineHeight: '0.875rem',
				letterSpacing: '-0.04rem',
				fontWeight: '400'
			}],
			'moa-body3': ['0.688rem', {
				lineHeight: '0.875rem',
				letterSpacing: '-0.04rem',
				fontWeight: '400'
			}],
			'moa-menu-header': ['1rem', {
				lineHeight: '0.875rem',
				letterSpacing: '-0.04rem',
				fontWeight: 'bold'
			}],
			'moa-menu-item': ['0.9rem', {
				lineHeight: '0.875rem',
				letterSpacing: '-0.04rem',
				fontWeight: '400'
			}],
		},
		minWidth: {
			'moa-menu': '18rem',
			'moa-content': '61rem'
		},
		width: {
			'moa-content': '61rem'
		}
  },
  plugins: [],
}

