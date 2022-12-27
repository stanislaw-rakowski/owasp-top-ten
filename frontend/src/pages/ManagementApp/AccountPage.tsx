import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { removeAuth, getAuth } from '../../lib/auth'
import { deleteAccount, seedAccountDatabase } from '../../lib/api'
import AppLayout from '../../components/AppLayout'
import Button from '../../components/Button'
import ActionModal from '../../components/ActionModal'
import Toast from '../../components/Toast'

const Content = styled.div`
	display: flex;
	justify-content: center;
	gap: 50px;
	align-items: flex-start;
	margin-top: 30px;
`

const Avatar = styled.div`
	height: 200px;
	width: 200px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 100px;
	background-color: ${({ theme }) => theme.colors.secondaryBackground};
`

const ButtonsSection = styled.div`
	display: flex;
	width: 100%;
	margin-top: 20px;
	justify-content: center;
	gap: 20px;
`

const Title = styled.p`
	font-size: 1.3rem;
`

const AccountPage = () => {
	const navigate = useNavigate()
	const [showDeleteAccountModal, setShowDeleteAccountModal] = React.useState(false)
	const [error, setError] = React.useState(false)
	const data = getAuth()

	const handleLogOut = () => {
		removeAuth()
		navigate('/log-in')
	}

	const handleAccountDelete = async () => {
		try {
			await deleteAccount()
			removeAuth()
			navigate('/about')
		} catch {
			setError(true)
		}
	}

	return (
		<AppLayout>
			<h1>Manage your Account</h1>
			<Content>
				<Avatar>
					<FaUser />
				</Avatar>
				<div>
					<Title>Email:</Title>
					<p>{data?.email}</p>
					<Title>Organization ID:</Title>
					<p>{data?.organizationId}</p>
				</div>
			</Content>
			<Content>
				<ButtonsSection>
					<Button variant="frame" onClick={handleLogOut}>
						Log out
					</Button>
					<Button variant="secondary" onClick={seedAccountDatabase}>
						Seed database
					</Button>
					<Button variant="destructive" onClick={() => setShowDeleteAccountModal(true)}>
						Delete account
					</Button>
				</ButtonsSection>
			</Content>
			{error && <Toast variant="error" message="Something went wrong" />}
			{showDeleteAccountModal && (
				<ActionModal
					text="Are you sure?"
					subText="This action will irreversibly delete your account with all of your shelters, employees and animals"
					acceptCta="Yes, delete"
					onAccept={handleAccountDelete}
					cancelCta="No, go back"
					onClose={() => setShowDeleteAccountModal(false)}
				/>
			)}
		</AppLayout>
	)
}

export default AccountPage
