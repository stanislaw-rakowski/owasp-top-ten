import React from 'react'
import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'
import { StyledForm, TopSection, SubHeading, Results, Row, ButtonsSection } from '../../../components/common'
import { getEmployeeById, deleteEmployeeById, updateEmployeeById } from '../../../lib/api'
import { Employee } from '../../../types'
import AppLayout from '../../../components/AppLayout'
import Button from '../../../components/Button'
import InputField from '../../../components/form/InputField'
import Modal from '../../../components/Modal'
import ActionModal from '../../../components/ActionModal'

const ResultRow = styled(Row)`
	span:nth-of-type(2) {
		flex: 3;
	}
`

const EmployeePage = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [showEmployeeEditModal, setShowEmployeeEditModal] = React.useState(false)
	const [showDeleteEmployeeModal, setShowDeleteEmployeeModal] = React.useState(false)
	const [employeeName, setEmployeeName] = React.useState('')
	const [employee, setEmployee] = React.useState<Employee | null>(null)

	if (!id) {
		navigate('/app/employee')
		return null
	}

	React.useEffect(() => {
		const getData = async () => {
			try {
				const data = await getEmployeeById(id)
				setEmployee(data)
				setEmployeeName(data.name)
			} catch {
				navigate('/app/employee')
			}
		}

		getData()
	}, [])

	if (!employee) {
		return <AppLayout />
	}

	const handleEmployeeEdit = async (event: React.FormEvent) => {
		event.preventDefault()

		const editedEmployee = {
			...employee,
			name: employeeName,
		}

		await updateEmployeeById(id, editedEmployee)

		setEmployee(editedEmployee)
		setShowEmployeeEditModal(false)
	}

	const handleEmployeeDelete = async () => {
		await deleteEmployeeById(id)
		setEmployee(null)
		navigate('/app/employee/all')
	}

	return (
		<AppLayout>
			<TopSection>
				<SubHeading>Employee Page</SubHeading>
				<ButtonsSection>
					<Button variant="primary" onClick={() => setShowEmployeeEditModal(true)}>
						Edit employee
					</Button>
					<Button variant="destructive" onClick={() => setShowDeleteEmployeeModal(true)}>
						Delete employee
					</Button>
				</ButtonsSection>
			</TopSection>
			{showDeleteEmployeeModal && (
				<ActionModal
					text="Are you sure?"
					subText="This action will irreversibly delete this employee"
					acceptCta="Yes, delete"
					onAccept={handleEmployeeDelete}
					cancelCta="No, go back"
					onClose={() => setShowDeleteEmployeeModal(false)}
				/>
			)}
			{showEmployeeEditModal && (
				<Modal title="Edit employee" onClose={() => setShowEmployeeEditModal(false)}>
					<StyledForm onSubmit={handleEmployeeEdit}>
						<InputField
							label="Name"
							type="text"
							placeholder="Enter employee name"
							value={employeeName}
							onChange={setEmployeeName}
							required
						/>
						<Button variant="submit">Edit</Button>
					</StyledForm>
				</Modal>
			)}
			<Results>
				<ResultRow>
					<span>{employee.name}</span>
					<span>{employee.shelterName}</span>
				</ResultRow>
			</Results>
		</AppLayout>
	)
}

export default EmployeePage
