import { ThemeProvider } from 'styled-components'
import { Routes, Route } from 'react-router-dom'
import { LiveChatWidget } from '@livechat/widget-react'
import theme from './styles/theme'
import GlobalStyles from './styles/GlobalStyles'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import BrowsePage from './pages/BrowsePage'
import ManagementPage from './pages/ManagementApp/ManagementPage'
import ShelterPage from './pages/ManagementApp/Shelter/ShelterPage'
import SheltersPage from './pages/ManagementApp/Shelter/SheltersPage'
import AnimalPage from './pages/ManagementApp/Animal/AnimalPage'
import AnimalsPage from './pages/ManagementApp/Animal/AnimalsPage'
import EmployeePage from './pages/ManagementApp/Employee/EmployeePage'
import EmployeesPage from './pages/ManagementApp/Employee/EmployeesPage'
import AccountPage from './pages/ManagementApp/AccountPage'

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<LiveChatWidget license="14842539" />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/about" element={<LandingPage />} />
				<Route path="/browse" element={<BrowsePage />} />
				<Route path="/sign-up" element={<SignupPage />} />
				<Route path="/log-in" element={<LoginPage />} />
				<Route element={<ProtectedRoute />}>
					<Route path="/app" element={<ManagementPage />} />
					<Route path="/app/shelter" element={<SheltersPage />} />
					<Route path="/app/shelter/:id" element={<ShelterPage />} />
					<Route path="/app/animal" element={<AnimalsPage />} />
					<Route path="/app/animal/:id" element={<AnimalPage />} />
					<Route path="/app/employee" element={<EmployeesPage />} />
					<Route path="/app/employee/:id" element={<EmployeePage />} />
					<Route path="/app/account" element={<AccountPage />} />
				</Route>
			</Routes>
		</ThemeProvider>
	)
}

export default App
