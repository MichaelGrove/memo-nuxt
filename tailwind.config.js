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
			}
		}
	},
	variants: {},
	plugins: []
}
