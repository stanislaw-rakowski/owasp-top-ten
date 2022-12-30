import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { requestLogin } from '../lib/api'
import Wrapper from '../components/Wrapper'
import Button from '../components/Button'
import Heading from '../components/Heading'

const Container = styled.div`
	width: 100%;
	height: 80%;
	display: flex;
	gap: 20px;
	position: relative;
`

const Instructions = styled.div`
	height: 100%;
	width: 50%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	padding: 25px;
	text-align: justify;
	font-size: 1.1rem;

	div {
		max-width: 700px;
	}

	p:first-of-type {
		font-style: italic;
	}

	code {
		font-size: 1.2rem;
		color: lightgray;
		padding-left: 40px;
	}
`

const Content = styled.div`
	height: 100%;
	width: 50%;
	background-color: ${({ theme }) => theme.colors.secondaryBackground};
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	padding: 20px;
`

const Form = styled.form`
	background-color: gray;
	display: flex;
	flex-direction: column;
	padding: 40px;
	width: 80%;
	max-width: 400px;
	margin-bottom: 20px;

	button {
		width: fit-content;
		align-self: center;
		margin-top: 20px;
	}
`

const Input = styled.input`
	width: 100%;
	height: 40px;
	padding: 4px 8px;
	border: none;
	background-color: darkgray;
	font-size: 16px;
	color: inherit;
	font-family: inherit;
	margin: 10px 0 20px;

	&:focus {
		outline: 1px solid white;
	}
`

const Text = styled.p`
	margin-top: auto;
`

const AuthenticationFailures = () => {
	const [login, setLogin] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [requestCount, setRequestCount] = React.useState(0)
	const navigate = useNavigate()

	const handleFormSubmit = async (event: React.FormEvent) => {
		event.preventDefault()

		await requestLogin({ login, password })
		setRequestCount((curr) => curr + 1)
	}

	return (
		<Wrapper>
			<Heading>Identification and Authentication Failures</Heading>
			<Container>
				<Instructions>
					<div>
						<p>
							Potwierdzenie tożsamości użytkownika, poprawne uwierzytelnienie i zarządzanie sesją ma kluczowe znaczenie
							dla ochrony przed atakami. Słabe punkty uwierzytelniania mogą występować, na przykład jeśli aplikacja
							pozwala na zautomatyzowane ataki, takie jak credential stuffing, w przypadku których osoba atakująca ma
							listę prawidłowych nazw użytkowników i haseł lub jeśli aplikacja zezwala na ataki typu brute force lub
							inne zautomatyzowane ataki.
						</p>
						<p>Znajdujesz się teraz na stronie z panelem logowania. Spróbuj zalogować się używając różnych danych.</p>
						<p>
							Na dole sekcji umieszczony jest licznik prób logowań. Jak możesz zauważyć formularz logowania nie posiada
							żadnego limitu prób logowań.
						</p>
						<p>
							Aby potwierdzić wiarygodność logowań do systemu możesz oworzyć narzędzia deweloperskie przeglądarki i
							wejść zakładkę 'network' i obserwować tam wysyłane zapytania '/login' do serwera.
						</p>
						<p>
							Brak zabepieczenia przed ilością logowań jest bardzo niebezpieczny i naraża na ataki typu brute force w
							celu uzyskania dostępu do konta.
						</p>
					</div>
				</Instructions>
				<Content>
					<h2>Panel logowania</h2>
					<Form onSubmit={handleFormSubmit}>
						<label>Login:</label>
						<Input type="text" onChange={(event) => setLogin(event.target.value)} />
						<label>Hasło:</label>
						<Input type="password" onChange={(event) => setPassword(event.target.value)} />
						<Button type="submit">Zaloguj</Button>
					</Form>
					<Text>Ilość prób logowania: {requestCount}</Text>
				</Content>
			</Container>
			<Button onClick={() => navigate('/cross-site-scripting?color=white')}>
				Next <HiArrowNarrowRight />
			</Button>
		</Wrapper>
	)
}

export default AuthenticationFailures
