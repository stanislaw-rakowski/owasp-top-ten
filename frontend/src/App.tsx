import { ThemeProvider } from 'styled-components'
import { Routes, Route } from 'react-router-dom'
import theme from './styles/theme'
import GlobalStyles from './styles/GlobalStyles'
import HomePage from './pages/HomePage'
import BrokenAccessControl from './pages/BrokenAccessControl'
import Injection from './pages/Injection'
import InsecureDesign from './pages/InsecureDesign'
import AuthenticationFailures from './pages/AuthenticationFailures'
import CrossSiteScripting from './pages/CrossSiteScripting'
import EndPage from './pages/EndPage'

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/broken-access-control" element={<BrokenAccessControl />} />
				<Route path="/injection" element={<Injection />} />
				<Route path="/insecure-design" element={<InsecureDesign />} />
				<Route path="/authentication-failures" element={<AuthenticationFailures />} />
				<Route path="/cross-site-scripting" element={<CrossSiteScripting />} />
				<Route path="/congratulations" element={<EndPage />} />
			</Routes>
		</ThemeProvider>
	)
}

export default App
