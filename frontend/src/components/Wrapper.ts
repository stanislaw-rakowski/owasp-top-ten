import styled from 'styled-components'

const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.primaryBackground};
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 40px;
	padding: 30px;
`

export default Wrapper
