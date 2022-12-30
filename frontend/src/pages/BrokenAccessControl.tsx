import React from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { HiArrowNarrowRight } from 'react-icons/hi'
import Wrapper from '../components/Wrapper'
import Button from '../components/Button'
import Heading from '../components/Heading'
import Content from '../components/Content'
import Container from '../components/Container'
import Instructions from '../components/Instructions'
import DataRow from '../components/DataRow'
import { employees } from '../lib/constants'

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
