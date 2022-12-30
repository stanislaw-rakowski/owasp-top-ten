import styled from 'styled-components'

const Input = styled.input`
	width: 100%;
	height: 40px;
	padding: 4px 8px;
	border: none;
	background-color: darkgray;
	font-size: 16px;
	color: inherit;
	font-family: inherit;
	margin: 10px 0 20px;

	&:focus {
		outline: 1px solid white;
	}
`

export default Input
