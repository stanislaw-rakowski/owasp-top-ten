import styled from 'styled-components'

const DataRow = styled.li`
	width: 100%;
	margin: 10px;
	font-size: 1.5rem;
	background-color: gray;
	padding: 20px;
	display: flex;
	justify-content: space-between;

	button {
		background-color: ${({ theme }) => theme.colors.accentColor};
		border: none;
		color: inherit;
		cursor: pointer;
	}
`

export default DataRow
