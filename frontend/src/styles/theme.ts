const theme = {
	colors: {
		primaryBackground: '#0C0C0C',
		secondaryBackground: '#292A2F',
		primaryFontColor: '#FBFBFB',
		secondaryFontColor: '#929294',
		accentColor: '#FF002D',
	},
} as const

export type Theme = typeof theme

export default theme
