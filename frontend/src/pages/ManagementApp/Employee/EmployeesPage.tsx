import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { StyledForm, TopSection, SubHeading, Results, Row, ButtonsSection, Legend } from '../../../components/common'
import { createEmployee, getEmployees, deleteEmployees, getShelters } from '../../../lib/api'
import { Employee, Shelter } from '../../../types'
import AppLayout from '../../../components/AppLayout'
import Button from '../../../components/Button'
import InputField from '../../../components/form/InputField'
import SelectField from '../../../components/form/SelectField'
import Modal from '../../../components/Modal'
import ActionModal from '../../../components/ActionModal'

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

const EmployeesPage = () => {
	const [showEmployeeAddModal, setShowEmployeeAddModal] = React.useState(false)
	const [showDeleteEmployeesModal, setShowDeleteEmployeesModal] = React.useState(false)
	const [employeeName, setEmployeeName] = React.useState('')
	const [selectedShelter, setSelectedShelter] = React.useState<string | null>(null)
	const [employees, setEmployees] = React.useState<Employee[]>([])
	const [shelters, setShelters] = React.useState<Shelter[]>([])

	React.useEffect(() => {
		const getData = async () => {
			const [employeesData, sheltersData] = await Promise.all([getEmployees(), getShelters()])

			setEmployees(employeesData)
			setShelters(sheltersData)
			setSelectedShelter(sheltersData[0]?.name)
		}

		getData()
	}, [])

	const shelterOptions = React.useMemo(() => [...new Set(shelters.map(({ name }) => name))], [shelters.length])

	const handleEmployeeCreate = async (event: React.FormEvent) => {
		event.preventDefault()

		const shelterId = shelters.find((shelter) => shelter.name === selectedShelter)?.shelterId

		if (!shelterId || !selectedShelter) {
			return
		}

		const response = await createEmployee({ name: employeeName, shelter: shelterId })

		setEmployees((current) => [...current, { ...response, shelterName: selectedShelter }])
		setEmployeeName('')
		setShowEmployeeAddModal(false)
	}

	const handleAllEmployeesDelete = async () => {
		if (employees.length === 0) return

		await deleteEmployees()
		setEmployees([])
	}

	return (
		<AppLayout>
			<TopSection>
				<SubHeading>Manage your employees</SubHeading>
				<ButtonsSection>
					<Button variant="primary" onClick={() => setShowEmployeeAddModal(true)}>
						Add employee
					</Button>
					<Button variant="destructive" onClick={() => setShowDeleteEmployeesModal(true)}>
						Delete employees
					</Button>
				</ButtonsSection>
			</TopSection>
			{showDeleteEmployeesModal && (
				<ActionModal
					text="Are you sure?"
					subText="This action will irreversibly delete all your employees"
					acceptCta="Yes, delete"
					onAccept={handleAllEmployeesDelete}
					cancelCta="No, go back"
					onClose={() => setShowDeleteEmployeesModal(false)}
				/>
			)}
			{showEmployeeAddModal && selectedShelter && (
				<Modal title="Add employee" onClose={() => setShowEmployeeAddModal(false)}>
					<StyledForm onSubmit={handleEmployeeCreate}>
						<InputField
							label="Name"
							type="text"
							placeholder="Enter employee name"
							value={employeeName}
							onChange={setEmployeeName}
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
						<Button variant="submit">Create</Button>
					</StyledForm>
				</Modal>
			)}
			<Results>
				<StyledLegend>
					<span>No.</span>
					<span>Name</span>
					<span>Shelter</span>
					<div>Page link</div>
				</StyledLegend>
				{employees.map(({ id, name, shelterName }, index) => (
					<ResultRow key={id}>
						<span>{index + 1}</span>
						<span>{name}</span>
						<span>{shelterName}</span>
						<Link to={`/app/employee/${id}`}>Details</Link>
					</ResultRow>
				))}
			</Results>
		</AppLayout>
	)
}

export default EmployeesPage
