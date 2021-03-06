/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
	theme: {
		extend: {
			gridTemplateColumns: {
				'memo-layout': 'repeat(auto-fill, minmax(320px, 1fr))'
			},
			gridTemplateRows: {
				layout: 'auto 1fr auto'
			},
			fontFamily: {
				display: ['Raleway', 'sans-serif'],
				'display-bold': ['Raleway Bold', 'sans-serif'],
				body: ['Lusitania', 'serif'],
				'body-bold': ['Lusitania Bold', 'serif']
			},
			colors: {
				highlight: '#535FD7',
				'highlight-hover': '#414DD2',
				dark: '#34373c'
			}
		},
		screens: {
			sm: '640px',
			// => @media (min-width: 640px) { ... }
			md: '768px',
			// => @media (min-width: 768px) { ... }
			lg: '1024px',
			// => @media (min-width: 1024px) { ... }
			xl: '1280px'
			// => @media (min-width: 1280px) { ... }
		}
	},
	variants: {},
	plugins: []
}
