import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { requestLogin, createRandomUser } from '../lib/api'
import { AuthData } from '../types'
import Wrapper from '../components/Wrapper'
import Button from '../components/Button'
import Heading from '../components/Heading'
import Content from '../components/Content'
import Container from '../components/Container'
import Instructions from '../components/Instructions'
import Form from '../components/Form'
import Input from '../components/Input'

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
							Znajdujesz się teraz na stronie z panelem logowania. Spróbuj zalogować się używając poniższych danych,
							oraz jakiś danych nieprawdziwych.
						</p>
						<code>login: admin</code>
						<code>hasło: admin</code>
						<p>W dolnej sekcji możesz obserwować surową odpowiedź z serwera.</p>
						<p>
							W prawym górnym rogu znajduje się przycisk, którym możesz wygenerować i dodać do bazy nowych użytkowników.
						</p>
						<p>
							Jeśli zapoznałeś się już z działaniem systemu logowania, spróbuj przeprowadzić atak SQL injection wpisując
							w oba pola następującą wartość:
						</p>
						<code>" OR "1"="1</code>
						<p>
							Pierwszy cudzysłów kończy wprowadzaną nazwę. Słowo 'OR' jest słowem kluczowym ze składni SQL i porównanie
							jakiegoś wprowadzonego słowa z warunkiem jeden równe jeden, który jest zawsze prawdziwy, spowodowało
							zaznaczenie wszystkich rzędów danych z bazy.
						</p>
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
