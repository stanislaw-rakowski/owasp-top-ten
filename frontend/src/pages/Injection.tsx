import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { requestLogin, createRandomUser } from '../lib/api'
import { AuthData } from '../types'
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

const GenerateButton = styled(Button)`
	position: absolute;
	top: 20px;
	right: 20px;
`

const ResultContainer = styled.div`
	height: 40%;
	width: 90%;
	background-color: ${({ theme }) => theme.colors.primaryBackground};
	overflow-y: auto;
	padding: 20px;
	font-size: 1rem;
	margin-bottom: 10px;
`

const Text = styled.p`
	margin-top: auto;
`

const Injection = () => {
	const [login, setLogin] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [response, setResponse] = React.useState<AuthData | null>(null)
	const navigate = useNavigate()

	const handleFormSubmit = async (event: React.FormEvent) => {
		event.preventDefault()

		setResponse(await requestLogin({ login, password }))
	}

	return (
		<Wrapper>
			<Heading>Injection</Heading>
			<Container>
				<Instructions>
					<div>
						<p>
							Ataki typu injection odnoszą się do szerokiej klasy wektorów ataku. W ataku polegającym na wstrzykiwaniu
							osoba atakująca dostarcza do programu niezaufane dane wejściowe. Te dane wejściowe są przetwarzane przez
							interpreter jako część polecenia lub zapytania. To z kolei zmienia wykonanie tego programu. <br />{' '}
							Wstrzyknięcia należą do najstarszych i najniebezpieczniejszych ataków wymierzonych w aplikacje
							internetowe. Mogą prowadzić do kradzieży danych, utraty danych, utraty integralności danych, odmowy
							usługi, a także całkowitego naruszenia bezpieczeństwa systemu. Podstawową przyczyną podatności na
							wstrzykiwanie jest zwykle niewystarczająca weryfikacja danych wprowadzonych przez użytkownika.
						</p>
						<p>
							Znajdujesz się teraz na stronie z panelem logowania. Spróbuj zalogować się używając różnych danych. W
							dolnej sekcji możesz obserwować surową odpowiedź z serwera.
						</p>
						<p>
							W prawym górnym rogu znajduje się przycisk, którym możesz wygenerować i dodać do bazy nowych użytkowników.
						</p>
						<p>
							Jeśli zapoznałeś się już z działaniem systemu logowania, spróbuj przeprowadzić atak SQL injection wpisując
							w oba pola następującą wartość:
						</p>
						<code>" OR "1"="1</code>
						<p>
							Przez źle zabepieczoną obsługę zapytań do bazy danych udało Ci się wyciągnąć całą listę kont z hasłami
							używając jednego prostego zapytania SQL.
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
					<GenerateButton onClick={createRandomUser}>Wygeneruj użytkownika</GenerateButton>
					<Text>Odpowiedź serwera:</Text>
					<ResultContainer>
						<pre>{response && JSON.stringify(response, undefined, 2)}</pre>
					</ResultContainer>
				</Content>
			</Container>
			<Button onClick={() => navigate('/insecure-design')}>
				Next <HiArrowNarrowRight />
			</Button>
		</Wrapper>
	)
}

export default Injection
