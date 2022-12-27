import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { Wrapper, Content, FormIsland, StyledForm } from '../components/common'
import { requestSignup } from '../lib/api'
import InputField from '../components/form/InputField'
import Button from '../components/Button'
import LandingNav from '../components/LandingNav'
import Toast from '../components/Toast'

const SignupPage = () => {
	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [error, setError] = React.useState<string | null>(null)
	const [success, setSuccess] = React.useState<string | null>(null)
	const [params] = useSearchParams()

	React.useEffect(() => {
		const providedEmail = params.get('email')

		if (providedEmail) {
			setEmail(providedEmail)
		}
	}, [])

	const handleFormSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		try {
			await requestSignup({ email, password })
			setError(null)
			setSuccess(`You've been successfuly signed up`)
			setTimeout(() => setSuccess(null), 7000)
		} catch (error: any) {
			setError(error.data.message)
			setTimeout(() => setError(null), 7000)
		}
	}

	return (
		<Wrapper>
			<LandingNav
				primary={{ to: success ? `/log-in?email=${encodeURIComponent(email)}` : '/log-in', text: 'Log in' }}
				secondary={{ to: '/about', text: 'About' }}
			/>
			<Content>
				<h1>Sign up</h1>
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
						<Button variant="submit">Sign up</Button>
					</StyledForm>
				</FormIsland>
				{success && <Toast variant="success" message={success} />}
			</Content>
		</Wrapper>
	)
}

export default SignupPage
