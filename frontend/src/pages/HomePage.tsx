import styled from 'styled-components'
import { HiArrowNarrowRight } from 'react-icons/hi'

const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.primaryBackground};
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 40px;
	padding: 30px 20%;

	blockquote {
		font-style: italic;
		text-align: center;
	}
`

const Heading = styled.h1`
	font-size: 4rem;
	font-weight: 700;
	margin: 0;
`

const Button = styled.button`
	border: none;
	color: inherit;
	padding: 1rem 2rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
	background-color: ${({ theme }) => theme.colors.accentColor};
	font-size: 1rem;
	cursor: pointer;
	transition: filter 200ms ease;

	&:hover {
		filter: brightness(0.8);
	}

	svg {
		font-size: 1rem;
	}
`

const HomePage = () => {
	return (
		<Wrapper>
			<Heading>OWASP Top Ten</Heading>
			<blockquote>
				The OWASP Top 10 is a standard awareness document for developers and web application security. It represents a
				broad consensus about the most critical security risks to web applications.
			</blockquote>
			<Button>
				Rozpocznij <HiArrowNarrowRight />
			</Button>
		</Wrapper>
	)
}

export default HomePage
