import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import LandingNav from '../components/LandingNav'
import Input from '../components/form/Input'
import Button from '../components/Button'

const Wrapper = styled.div`
	height: 100%;
	background-color: ${({ theme }) => theme.colors.primaryBackground};
`

const Content = styled.main`
	height: calc(100% - 100px);
	width: 100%;
	display: flex;
`

const Section = styled.div`
	height: 100%;
	width: 50%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
`

const Heading = styled.h1`
	width: 70%;
	font-size: 5rem;
	font-weight: 800;
	margin: 2rem;
	margin-left: 10%;
`

const Color = styled.span`
	color: ${({ theme }) => theme.colors.accentFontColor};
`

const SubHeading = styled.p`
	width: 70%;
	font-size: 2rem;
	margin: 0 2rem;
	margin-left: 10%;
`

const InputSection = styled.form`
	width: 70%;
	max-width: 500px;
	margin: 2rem;
	margin-left: 10%;
	display: flex;
	gap: 1rem;

	button {
		height: 40px;
		flex-shrink: 0;
	}
`

const Image = styled.img`
	height: 100%;
	width: 100%;
	object-fit: cover;
`

const LandingPage = () => {
	const [email, setEmail] = React.useState('')
	const navigate = useNavigate()

	return (
		<Wrapper>
			<LandingNav primary={{ to: '/sign-up', text: 'Sign up' }} secondary={{ to: '/log-in', text: 'Log in' }} />
			<Content>
				<Section>
					<Heading>
						Manage your animals <br />
						<Color>like a pro</Color>
					</Heading>
					<SubHeading>sign up today for our all in one animal management platform</SubHeading>
					<InputSection onSubmit={() => navigate(`/sign-up?email=${encodeURIComponent(email)}`)}>
						<Input
							type="email"
							value={email}
							placeholder="Enter email"
							onChange={(event) => setEmail(event.target.value)}
							required
						/>
						<Button variant="primary" type="submit">
							Sign up
						</Button>
					</InputSection>
				</Section>
				<Section>
					<Image
						src="https://www.creativefabrica.com/wp-content/uploads/2020/12/01/Horizontal-Background-Landscape-with-Dog-Graphics-6955276.jpg"
						alt=""
					/>
				</Section>
			</Content>
		</Wrapper>
	)
}

export default LandingPage
