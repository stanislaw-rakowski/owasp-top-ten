import React from 'react'
import { useNavigate } from 'react-router-dom'
import { HiArrowNarrowRight } from 'react-icons/hi'
import Confetti from 'react-dom-confetti'
import Wrapper from '../components/Wrapper'
import Button from '../components/Button'
import Heading from '../components/Heading'

const CONFETTI_ENTRY_TIMEOUT = 300
const CONFETTI_EXIT_TIMEOUT = 700

const confettiSetup = {
	spread: 360,
	startVelocity: 50,
	elementCount: 400,
	duration: 4000,
}

const EndPage = () => {
	const [isConfettiReady, setIsConfettiReady] = React.useState(false)
	const navigate = useNavigate()

	React.useEffect(() => {
		const entryTimeout = setTimeout(() => setIsConfettiReady(true), CONFETTI_ENTRY_TIMEOUT)
		const exitTimeout = setTimeout(() => setIsConfettiReady(false), CONFETTI_EXIT_TIMEOUT)

		return () => {
			clearTimeout(entryTimeout)
			clearTimeout(exitTimeout)
		}
	}, [])

	return (
		<Wrapper>
			<Confetti active={isConfettiReady} config={confettiSetup} />
			<Heading>Gratulacje!</Heading>
			<p>Ukończyłeś interaktywny poradnik z podatności aplikacji przeglądarkowych OWASP Top Ten.</p>
			<Button onClick={() => navigate('/')}>
				Strona główna <HiArrowNarrowRight />
			</Button>
		</Wrapper>
	)
}

export default EndPage
