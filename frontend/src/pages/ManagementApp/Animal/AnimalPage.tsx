import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { StyledForm, TopSection, SubHeading } from '../../../components/common'
import { getAnimalById, updateAnimalById, deleteAnimalById } from '../../../lib/api'
import { Animal, AnimalForm, AnimalData } from '../../../types'
import AppLayout from '../../../components/AppLayout'
import Button from '../../../components/Button'
import InputField from '../../../components/form/InputField'
import SelectField from '../../../components/form/SelectField'
import TextAreaField from '../../../components/form/TextAreaField'
import Modal from '../../../components/Modal'
import ActionModal from '../../../components/ActionModal'

const ButtonsSection = styled.div`
	display: flex;
	justify-content: space-between;

	span {
		display: flex;
		gap: 1rem;
	}
`

const AnimalPage = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [animal, setAnimal] = React.useState<Animal | null>(null)
	const [showEditModal, setShowEditModal] = React.useState(false)
	const [showDeleteModal, setShowDeleteModal] = React.useState(false)
	const [animalFormData, setAnimalFormData] = React.useState<AnimalForm>({
		name: '',
		species: '',
		gender: '',
		birthDate: '',
		description: '',
	})

	if (!id) {
		navigate('/app/animal')
		return null
	}

	React.useEffect(() => {
		const getAnimal = async () => {
			try {
				const data = await getAnimalById(id)
				setAnimal(data)
				setAnimalFormData({
					name: data.name,
					species: data.species,
					gender: data.gender,
					birthDate: data.birthDate,
					description: data.description,
				})
			} catch {
				navigate('/app/animal')
			}
		}

		getAnimal()
	}, [])

	if (!animal) {
		return <AppLayout />
	}

	const handleInputValueChange = (key: keyof AnimalForm) => (value: AnimalForm[typeof key]) => {
		setAnimalFormData({ ...animalFormData, [key]: value })
	}

	const handleAnimalEdit = async (event: React.FormEvent) => {
		event.preventDefault()

		const editedAnimal = {
			name: animalFormData.name,
			birthDate: animalFormData.birthDate,
			gender: animalFormData.gender,
			species: animalFormData.species,
			description: animalFormData.description,
		} as AnimalData

		await updateAnimalById(id, editedAnimal)

		setAnimal({ ...animal, ...editedAnimal })
		setShowEditModal(false)
	}

	const handleAnimalDelete = async () => {
		await deleteAnimalById(id)

		setAnimal(null)
		navigate('/app/animal')
	}

	return (
		<AppLayout>
			<TopSection>
				<h2>Animal</h2>
				<SubHeading>{animal.name}</SubHeading>
				<ButtonsSection>
					<Button variant="primary" onClick={() => setShowEditModal((curr) => !curr)}>
						Edit
					</Button>
					<Button variant="destructive" onClick={() => setShowDeleteModal(true)}>
						Delete
					</Button>
				</ButtonsSection>
			</TopSection>
			<p>
				{animal.birthDate} - {animal.gender} - {animal.species} - {animal.description}
			</p>
			{showDeleteModal && (
				<ActionModal
					text="Are you sure?"
					subText="This action will irreversibly delete this animal"
					acceptCta="Yes, delete"
					onAccept={handleAnimalDelete}
					cancelCta="No, go back"
					onClose={() => setShowDeleteModal(false)}
				/>
			)}
			{showEditModal && (
				<Modal title="Edit animal" onClose={() => setShowEditModal(false)}>
					<StyledForm onSubmit={handleAnimalEdit}>
						<InputField
							label="Name"
							type="text"
							placeholder="Enter animal name"
							value={animalFormData.name}
							onChange={handleInputValueChange('name')}
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
						<Button variant="submit">Edit</Button>
					</StyledForm>
				</Modal>
			)}
		</AppLayout>
	)
}

export default AnimalPage
