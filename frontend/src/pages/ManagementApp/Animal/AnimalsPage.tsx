import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { TopSection, SubHeading, Results, Row, StyledForm, ButtonsSection, Legend } from '../../../components/common'
import { SpeciesIcon, GenderIcon } from '../../../components/icons'
import { getAllAnimals, createAnimal, getShelters } from '../../../lib/api'
import { AnimalWithShelter, Shelter, AnimalForm, AnimalData } from '../../../types'
import AppLayout from '../../../components/AppLayout'
import Button from '../../../components/Button'
import InputField from '../../../components/form/InputField'
import TextAreaField from '../../../components/form/TextAreaField'
import SelectField from '../../../components/form/SelectField'
import Modal from '../../../components/Modal'

const ResultRow = styled(Row)`
	span:nth-of-type(2) {
		flex: 3;
	}
`

const StyledLegend = styled(Legend)`
	span:nth-of-type(2) {
		flex: 3;
	}
`

const AnimalsPage = () => {
	const [showAddAnimalModal, setShowAddAnimalModal] = React.useState(false)
	const [animalFormData, setAnimalFormData] = React.useState<AnimalForm>({
		name: '',
		species: 'dog',
		gender: 'male',
		birthDate: '',
		description: '',
	})
	const [selectedShelter, setSelectedShelter] = React.useState<string | null>(null)
	const [shelters, setShelters] = React.useState<Shelter[]>([])
	const [animals, setAnimals] = React.useState<AnimalWithShelter[]>([])

	React.useEffect(() => {
		const getAnimals = async () => {
			const [animalsData, sheltersData] = await Promise.all([getAllAnimals(), getShelters()])

			setAnimals(animalsData)
			setShelters(sheltersData)
			setSelectedShelter(sheltersData[0]?.name)
		}

		getAnimals()
	}, [])

	const shelterOptions = React.useMemo(() => [...new Set(shelters.map(({ name }) => name))], [shelters.length])

	const handleInputValueChange = (key: keyof AnimalForm) => (value: AnimalForm[typeof key]) => {
		setAnimalFormData({ ...animalFormData, [key]: value })
	}

	const handleAnimalAdd = async (event: React.FormEvent) => {
		event.preventDefault()

		const shelterId = shelters.find((shelter) => shelter.name === selectedShelter)?.shelterId

		if (!shelterId || !selectedShelter) {
			return
		}

		const addedAnimal = await createAnimal(shelterId, {
			name: animalFormData.name,
			birthDate: animalFormData.birthDate,
			gender: animalFormData.gender,
			species: animalFormData.species,
			description: animalFormData.description,
		} as AnimalData)

		setAnimals((current) => [...current, { ...addedAnimal, shelterName: selectedShelter }])
		setAnimalFormData({
			name: '',
			species: '',
			gender: '',
			birthDate: '',
			description: '',
		})
		setShowAddAnimalModal(false)
	}

	return (
		<AppLayout>
			<TopSection>
				<SubHeading>Manage your animals</SubHeading>
				<ButtonsSection>
					<Button variant="primary" onClick={() => setShowAddAnimalModal((curr) => !curr)}>
						Add animal
					</Button>
				</ButtonsSection>
			</TopSection>
			{showAddAnimalModal && selectedShelter && (
				<Modal title="Add animal" onClose={() => setShowAddAnimalModal(false)}>
					<StyledForm onSubmit={handleAnimalAdd}>
						<InputField
							label="Name"
							type="text"
							placeholder="Enter animal name"
							value={animalFormData.name}
							onChange={handleInputValueChange('name')}
							required
						/>
						<SelectField
							label="Shelter"
							placeholder="Select shelter"
							options={shelterOptions}
							value={selectedShelter}
							onChange={setSelectedShelter}
							required
						/>
						<InputField
							label="Birth date"
							type="date"
							placeholder="Enter birth date"
							value={animalFormData.birthDate}
							onChange={handleInputValueChange('birthDate')}
							required
						/>
						<SelectField
							label="Gender"
							placeholder="Enter animal gender"
							value={animalFormData.gender}
							options={['male', 'female']}
							onChange={handleInputValueChange('gender')}
							required
						/>
						<SelectField
							label="Species"
							placeholder="Enter animal species"
							value={animalFormData.species}
							options={['dog', 'cat', 'other']}
							onChange={handleInputValueChange('species')}
							required
						/>
						<TextAreaField
							label="Description"
							placeholder="Enter description"
							value={animalFormData.description}
							onChange={handleInputValueChange('description')}
							required
						/>
						<Button variant="submit">Add</Button>
					</StyledForm>
				</Modal>
			)}
			<Results>
				<StyledLegend>
					<span>No.</span>
					<span>Name</span>
					<span>Gender</span>
					<span>Species</span>
					<span>Shelter</span>
					<div>Page link</div>
				</StyledLegend>
				{animals.map(({ id, name, gender, species, shelterName }, index) => (
					<ResultRow key={id}>
						<span>{index + 1}</span>
						<span>{name}</span>
						<span>
							<GenderIcon gender={gender} />
						</span>
						<span>
							<SpeciesIcon species={species} />
						</span>
						<span>{shelterName}</span>
						<Link to={`/app/animal/${id}`}>Details</Link>
					</ResultRow>
				))}
			</Results>
		</AppLayout>
	)
}

export default AnimalsPage
