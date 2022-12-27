import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Wrapper, Content, FormIsland, StyledForm } from '../components/common'
import { setAuth, getAuth } from '../lib/auth'
import { requestLogin } from '../lib/api'
import InputField from '../components/form/InputField'
import Button from '../components/Button'
import LandingNav from '../components/LandingNav'
import Toast from '../components/Toast'

const LoginPage = () => {
	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [error, setError] = React.useState<string | null>(null)
	const navigate = useNavigate()
	const [params] = useSearchParams()

	React.useEffect(() => {
		if (getAuth()) {
			navigate('/app')
		}

		const providedEmail = params.get('email')

		if (providedEmail) {
			setEmail(decodeURIComponent(providedEmail))
		}
	}, [])

	const handleFormSubmit = async (event: React.FormEvent) => {
		event.preventDefault()

		try {
			const response = await requestLogin({ email, password })

			setAuth(response)
			setError(null)
			navigate('/app')
		} catch (error: any) {
			setError(error.data.message)
			setTimeout(() => setError(null), 7000)
		}
	}

	return (
		<Wrapper>
			<LandingNav primary={{ to: '/sign-up', text: 'Sign up' }} secondary={{ to: '/about', text: 'About' }} />
			<Content>
				<h1>Log in</h1>
				<FormIsland>
					<StyledForm onSubmit={handleFormSubmit}>
						<InputField
							label="email"
							type="email"
							value={email}
							placeholder="Enter email"
							onChange={setEmail}
							required
						/>
						<InputField
							label="password"
							type="password"
							value={password}
							placeholder="Enter password"
							onChange={setPassword}
							required
						/>
						{error && <Toast variant="error" message={error} />}
						<Button variant="submit">Log in</Button>
					</StyledForm>
				</FormIsland>
			</Content>
		</Wrapper>
	)
}

export default LoginPage
