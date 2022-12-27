import styled from 'styled-components'

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

export default Button
