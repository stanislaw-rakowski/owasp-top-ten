import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { HiArrowNarrowRight } from 'react-icons/hi'
import Wrapper from '../components/Wrapper'
import Button from '../components/Button'
import Heading from '../components/Heading'

const Container = styled.div`
	width: 100%;
	height: 80%;
	display: flex;
	gap: 20px;
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

const FakeWebsite = styled.div`
	height: 30%;
	width: 80%;
	margin-top: 50px;
	font-family: serif;
	color: black;
	padding: 20px;
	text-align: justify;
	border: 1px solid gray;

	h2 {
		border-bottom: 1px solid black;
	}
`

const CrossSiteScripting = () => {
	const navigate = useNavigate()

	return (
		<Wrapper>
			<Heading>Cross-site scripting</Heading>
			<Container>
				<Instructions>
					<div>
						<p>
							Ataki Cross-Site Scripting (XSS) to rodzaj ataków, w których złośliwe skrypty są wprowadzane do
							niegroźnych i zaufanych stron internetowych. Ataki XSS mają miejsce, gdy osoba atakująca używa aplikacji
							internetowej do wysłania złośliwego kodu, zwykle w postaci skryptu po stronie przeglądarki, do innego
							użytkownika końcowego. Luki, które umożliwiają powodzenie tych ataków, są dość powszechne i występują
							wszędzie tam, gdzie aplikacja internetowa wykorzystuje dane wejściowe od użytkownika w generowanych danych
							wyjściowych bez sprawdzania ich poprawności lub kodowania.
						</p>
						<p>
							Po prawej stronie możesz zauważyć przykładową stronę internetową. Kolor tła tej strony zależny jest od
							parametru 'color' przekazanego w adresie strony.
						</p>
						<p>
							Aktualnie w adresie strony dla parametru 'color' przekazana jest wartość 'white'. Spróbuj zmienić aktualną
							wartość w pasku wyszukiwarki na np. 'yellow'.
						</p>
						<p>Jak możesz zauważyć, kolor tła przykładowej strony się zmienił.</p>
						<p>
							Spróbuj teraz wykorzystać odczytywanie wartości tła z tego parametru do przeprowadzenia prostego ataku DOM
							XSS. Zmień wartość parametru 'color', aby posiadał poniższą wartość:
						</p>
						<code>{`?color=</style><script>alert('Hello!')</script>`}</code>
						<p>
							Źle zabezpieczona obsługa wartości parametru koloru umożliwiła uruchomienie skryptu na stronie. W tym
							przykładzie został wykonany prosty i nieszkodliwy alert, ale taka podatność mogła by zostać wykorzystana
							do wykradania i wysyłania wrażliwych danych, dzięki odpowiednio przygotowanemu linkowi ze skryptem.
						</p>
					</div>
				</Instructions>
				<Content>
					<FakeWebsite id="website">
						<h2>Example.com</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
							ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
							fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
							mollit anim id est laborum.
						</p>
					</FakeWebsite>
				</Content>
			</Container>
			<Button onClick={() => navigate('/congratulations')}>
				Next <HiArrowNarrowRight />
			</Button>
		</Wrapper>
	)
}

export default CrossSiteScripting
