import styled from 'styled-components'

const Content = styled.div`
	height: 100%;
	width: 50%;
	background-color: ${({ theme }) => theme.colors.secondaryBackground};
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	padding: 20px;

	ol {
		width: 80%;
		max-width: 500px;
		list-style: none;
		padding: 0;
	}
`

export default Content
