import { ThemeProvider } from 'styled-components'
import { Routes, Route } from 'react-router-dom'
import theme from './styles/theme'
import GlobalStyles from './styles/GlobalStyles'
import HomePage from './pages/HomePage'
import BrokenAccessControl from './pages/BrokenAccessControl'
import Injection from './pages/Injection'

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/broken-access-control" element={<BrokenAccessControl />} />
				<Route path="/injection" element={<Injection />} />
			</Routes>
		</ThemeProvider>
	)
}

export default App
