import React from 'react'
import styled from 'styled-components'
import { useSearchParams, useNavigate } from 'react-router-dom'
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
		color: gray;
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

const BrokenAccessControl = () => {
	const [data, setData] = React.useState(employees)
	const [params] = useSearchParams()
	const navigate = useNavigate()
	const access = params.get('access')

	const handleDelete = (id: number) => {
		setData((current) => current.filter((employee) => employee.id !== id))
	}

	return (
		<Wrapper>
			<Heading>Broken Access Control</Heading>
			<Container>
				<Instructions>
					<div>
						<p>
							Kontrola dostępu wymusza takie zasady, aby użytkownicy nie mogli działać poza określonymi uprawnieniami.
							Błędnie obsłużona kontrola dostępu zwykle prowadzi do nieautoryzowanego ujawnienia informacji, modyfikacji
							lub zniszczenia wszystkich danych lub wykonania operacji poza ograniczeniami użytkownika.
						</p>
						<p>
							Znajdujesz się właśnie na stronie z panelem pracowników z danej firmy. Jesteś zalogowany jako zwykły
							użytkownik i jedyną akcją jaką możesz wykonać to przeglądanie listy pracowników.
						</p>
						<p>Spójrz jednak na pasek adresu strony w przeglądarce. Możesz tam zauważyć pewien parametr w adresie:</p>
						<code>?access=user</code>
						<p>
							Obsługa dostępu użytkowników wykonana w taki sposób może być objawem źle zaimplementowanej kontroli
							dostępu.
						</p>
						<p>Spróbuj edytować aktualny adres i zmień wartość parametru access na wartość admin:</p>
						<code>?access=admin</code>
						<p>Jak możesz zauważyć, na liście przy każdym pracowniku pojawił się przycisk usuwania.</p>
						<p>
							Przez źle zaimplementowaną na stronie obsługę dostępu, jesteś w stanie wykonać szkodliwą akcję, czyli
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
								{access === 'admin' && <button onClick={() => handleDelete(id)}>delete</button>}
							</DataRow>
						))}
					</ol>
				</Content>
			</Container>
			<Button onClick={() => navigate('/injection')}>
				Next <HiArrowNarrowRight />
			</Button>
		</Wrapper>
	)
}

export default BrokenAccessControl
