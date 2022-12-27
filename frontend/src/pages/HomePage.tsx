import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { HiArrowNarrowRight } from 'react-icons/hi'
import Wrapper from '../components/Wrapper'
import Button from '../components/Button'
import Heading from '../components/Heading'

const Quote = styled.blockquote`
	font-style: italic;
	text-align: center;
`

const HomePage = () => {
	const navigate = useNavigate()

	return (
		<Wrapper>
			<Heading>OWASP Top Ten</Heading>
			<Quote>
				The OWASP Top 10 is a standard awareness document for developers and web application security. It represents a
				broad consensus about the most critical security risks to web applications.
			</Quote>
			<Button onClick={() => navigate('/broken-access-control')}>
				Rozpocznij <HiArrowNarrowRight />
			</Button>
		</Wrapper>
	)
}

export default HomePage
