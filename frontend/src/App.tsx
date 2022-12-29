import { ThemeProvider } from 'styled-components'
import { Routes, Route } from 'react-router-dom'
import theme from './styles/theme'
import GlobalStyles from './styles/GlobalStyles'
import HomePage from './pages/HomePage'
import BrokenAccessControl from './pages/BrokenAccessControl'
import Injection from './pages/Injection'
import InsecureDesign from './pages/InsecureDesign'

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/broken-access-control" element={<BrokenAccessControl />} />
				<Route path="/injection" element={<Injection />} />
				<Route path="/insecure-design" element={<InsecureDesign />} />
			</Routes>
		</ThemeProvider>
	)
}

export default App
