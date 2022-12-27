import { ThemeProvider } from 'styled-components'
import { Routes, Route } from 'react-router-dom'
import theme from './styles/theme'
import GlobalStyles from './styles/GlobalStyles'
import HomePage from './pages/HomePage'

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<Routes>
				<Route path="/" element={<HomePage />} />
			</Routes>
		</ThemeProvider>
	)
}

export default App
