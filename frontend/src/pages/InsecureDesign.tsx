import React from 'react'
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

	p > code {
		color: inherit;
		padding: 0;
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

	ol {
		width: 80%;
		max-width: 500px;
		list-style: none;
		padding: 0;
	}
`

const DataRow = styled.li`
	width: 100%;
	margin: 10px;
	font-size: 1.5rem;
	background-color: gray;
	padding: 20px;
	display: flex;
	justify-content: space-between;

	button {
		background-color: ${({ theme }) => theme.colors.accentColor};
		border: none;
		color: inherit;
		cursor: pointer;
		visibility: hidden;
	}
`

const employees = [
	{
		id: 1,
		name: 'Jim Halpert',
	},
	{
		id: 2,
		name: 'Micheal Scott',
	},
	{
		id: 3,
		name: 'Dwight Shrute',
	},
	{
		id: 4,
		name: 'Pam Beesly',
	},
]

const InsecureDesign = () => {
	const [data, setData] = React.useState(employees)
	const navigate = useNavigate()

	const handleDelete = (id: number) => {
		setData((current) => current.filter((employee) => employee.id !== id))
	}

	return (
		<Wrapper>
			<Heading>Insecure Design</Heading>
			<Container>
				<Instructions>
					<div>
						<p>
							Niezabezpieczony design projektu pojawiaja się, gdy programiści, zespoły ds. kontroli jakości i/lub
							bezpieczeństwa nie przewidzą i nie ocenią zagrożeń na etapie projektowania kodu. Podatności te są również
							konsekwencją nieprzestrzegania najlepszych praktyk bezpieczeństwa podczas projektowania aplikacji. Bez
							bezpiecznego designu projektu trudno jest wykryć i naprawić wady architektoniczne.
						</p>
						<p>
							Znajdujesz się właśnie na stronie z panelem pracowników z danej firmy. Jesteś zalogowany jako zwykły
							użytkownik i jedyną akcją jaką możesz wykonać to przeglądanie listy pracowników.
						</p>
						<p>
							Wiesz jednak, że gdybyś miał uprawnienia administratorskie byłbyś w stanie edytować lub usuwać pracowników
							z listy.
						</p>
						<p>
							Otwórz narzędzia deweloperskie przeglądarki, wybierz opcję celownika i zaznacz jeden z szarych
							prostokątów, w których znajdują się dane pracowików.
						</p>
						<p>
							Jak możesz zauważyć w strukturze drzewa html w narzędziach deweloperskich w badanym elemencie oprócz
							numeru i danych imiennych, znajduje się również przycisk:
						</p>
						<code>{`<button class="delete-button">delete</button>`}</code>
						<p>
							Przycisk nie jest widoczny na stronie i nie można go użyć, ponieważ ma on nałożony styl CSS:{' '}
							<code>visibility: hidden;</code>
						</p>
						<p>
							Aby wyświetlić przyciski do usuwania na stronie, wejdź w zakładkę 'console' w narzędziach deweloperskich,
							a następnie wklej tam poniższy kod i uruchom go klikając enter.
						</p>
						<code>{`document.querySelectorAll('.delete-button').forEach((el) => (el.style.visibility = 'visible'))`}</code>
						<p>Jak możesz zauważyć na liście pracowników pojawiły się przyciski do usuwania pracowników.</p>
						<p>
							Przez zły design i źle zaprojektowane zarządzanie dostępem jesteś w stanie wykonać szkodliwą akcję, czyli
							usunąć pracowników.
						</p>
					</div>
				</Instructions>
				<Content>
					<h2>Lista pracowników</h2>
					<ol>
						{data.map(({ id, name }) => (
							<DataRow key={id}>
								{id}. {name}
								<button className="delete-button" onClick={() => handleDelete(id)}>
									delete
								</button>
							</DataRow>
						))}
					</ol>
				</Content>
			</Container>
			<Button onClick={() => navigate('/')}>
				Next <HiArrowNarrowRight />
			</Button>
		</Wrapper>
	)
}

export default InsecureDesign
