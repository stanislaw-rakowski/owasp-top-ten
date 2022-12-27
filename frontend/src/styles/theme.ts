const theme = {
	colors: {
		primaryBackground: '#111728',
		secondaryBackground: '#1F2937',
		primaryFontColor: '#FFFFFF',
		secondaryFontColor: '#9CA3AF',
		accentFontColor: '#818CF8',
		primaryButtonBackground: '#6366F1',
		secondaryButtonBackground: '#4B5563',
		primaryButtonBackgroundHover: '#4E46E5',
		secondaryButtonBackgroundHover: '#384151',
		destructiveBackground: '#D64646',
		destructiveBackgroundHover: '#CE6363',
		successBackground: '#08CE4A',
		successBackgroundHover: '#4EF485',
		sideBarSurface: '#2c2c2c',
		sideBarSurfaceHover: '#151515',
	},
} as const

export type Theme = typeof theme

export default theme
