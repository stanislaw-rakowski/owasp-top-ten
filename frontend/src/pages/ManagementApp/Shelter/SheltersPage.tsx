import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaLock, FaLockOpen } from 'react-icons/fa'
import { StyledForm, TopSection, SubHeading, Results, Row, ButtonsSection, Legend } from '../../../components/common'
import { createShelter, getShelters, deleteShelters } from '../../../lib/api'
import { Shelter } from '../../../types'
import AppLayout from '../../../components/AppLayout'
import Button from '../../../components/Button'
import InputField from '../../../components/form/InputField'
import Modal from '../../../components/Modal'
import ActionModal from '../../../components/ActionModal'

const ResultRow = styled(Row)`
	span:nth-of-type(2) {
		flex: 4;
	}
`

const StyledLegend = styled(Legend)`
	span:nth-of-type(2) {
		flex: 4;
	}
`

const SheltersPage = () => {
	const [showShelterCreationModal, setShowShelterCreationModal] = React.useState(false)
	const [showDeleteSheltersModal, setShowDeleteSheltersModal] = React.useState(false)
	const [shelterName, setShelterName] = React.useState('')
	const [shelters, setShelters] = React.useState<Shelter[]>([])

	React.useEffect(() => {
		const getUserShelters = async () => {
			setShelters(await getShelters())
		}

		getUserShelters()
	}, [])

	const handleShelterCreate = async (event: React.FormEvent) => {
		event.preventDefault()

		const response = await createShelter(shelterName)
		setShelters((current) => [...current, response])
		setShelterName('')
		setShowShelterCreationModal(false)
	}

	const handleAllSheltersDelete = async () => {
		if (shelters.length === 0) return

		await deleteShelters()
		setShelters([])
	}

	return (
		<AppLayout>
			<TopSection>
				<SubHeading>Manage your shelters</SubHeading>
				<ButtonsSection>
					<Button variant="primary" onClick={() => setShowShelterCreationModal(true)}>
						Create shelter
					</Button>
					<Button variant="destructive" onClick={() => setShowDeleteSheltersModal(true)}>
						Delete shelters
					</Button>
				</ButtonsSection>
			</TopSection>
			{showDeleteSheltersModal && (
				<ActionModal
					text="Are you sure?"
					subText="This action will irreversibly delete all your shelters"
					acceptCta="Yes, delete"
					onAccept={handleAllSheltersDelete}
					cancelCta="No, go back"
					onClose={() => setShowDeleteSheltersModal(false)}
				/>
			)}
			{showShelterCreationModal && (
				<Modal title="Create shelter" onClose={() => setShowShelterCreationModal(false)}>
					<StyledForm onSubmit={handleShelterCreate}>
						<InputField
							label="Name"
							type="text"
							placeholder="Enter shelter name"
							value={shelterName}
							onChange={setShelterName}
							required
						/>
						<Button variant="submit">Create</Button>
					</StyledForm>
				</Modal>
			)}
			<Results>
				<StyledLegend>
					<span>No.</span>
					<span>Name</span>
					<span>Published</span>
					<div>Page link</div>
				</StyledLegend>
				{shelters.map(({ shelterId, name, published }, index) => (
					<ResultRow key={shelterId}>
						<span>{index + 1}</span>
						<span>{name}</span>
						<span>{published === 0 ? <FaLock /> : <FaLockOpen />}</span>
						<Link to={`/app/shelter/${shelterId}`}>Details</Link>
					</ResultRow>
				))}
			</Results>
		</AppLayout>
	)
}

export default SheltersPage
