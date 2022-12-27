import React from 'react'
import styled from 'styled-components'
import { getPublicShelters, getPublicAnimals, getPublicAnimalById } from '../lib/api'
import { Animal, Shelter } from '../types'
import { Results, Row, SubHeading } from '../components/common'
import { SpeciesIcon, GenderIcon } from '../components/icons'

const Wrapper = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: ${({ theme }) => theme.colors.primaryBackground};
	padding: 2rem 150px;
`

const StyledResults = styled(Results)`
	width: 100%;
`

const AnimalRow = styled(Row)`
	width: 100%;
	gap: 1rem;

	span {
		flex: 1;
	}
`

const ShelterRow = styled(Row)`
	width: 100%;

	span {
		flex: 1;
	}

	span:nth-of-type(2) {
		flex: 4;
	}
`

const BrowsePage = () => {
	const [shelters, setShelters] = React.useState<Shelter[] | null>(null)
	const [animals, setAnimals] = React.useState<Animal[] | null>(null)

	React.useEffect(() => {
		const getData = async () => {
			setShelters(await getPublicShelters())
			setAnimals(await getPublicAnimals())
		}

		getData()
	}, [])

	if (animals === null || shelters === null) {
		return <Wrapper />
	}

	return (
		<Wrapper>
			<SubHeading>Browse shelters</SubHeading>
			<StyledResults>
				{shelters.map(({ shelterId, name }, index) => (
					<ShelterRow key={shelterId}>
						<span>{index + 1}</span>
						<span>{name}</span>
					</ShelterRow>
				))}
			</StyledResults>
			<SubHeading>Browse animals</SubHeading>
			<StyledResults>
				{animals.map(({ id, name, birthDate, gender, species }, index) => (
					<AnimalRow key={id}>
						<span>{index + 1}</span>
						<span>{name}</span>
						<span>{birthDate.split('T')[0]}</span>
						<span>
							<GenderIcon gender={gender} />
						</span>
						<span>
							<SpeciesIcon species={species} />
						</span>
					</AnimalRow>
				))}
			</StyledResults>
		</Wrapper>
	)
}

export default BrowsePage
