import { createGlobalStyle } from 'styled-components'
import type { Theme } from './theme'

const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
    html {
        box-sizing: border-box;
    }

    #root {
        height: 100%;
        width: 100%;
        position: fixed;
    }

    *,
    *::before, 
    *::after {
        box-sizing: inherit;
    }
    
    body {
        font-family: 'Roboto Mono', sans-serif;
        color: ${({ theme }) => theme.colors.primaryFontColor};
        margin: 0;
        padding: 0;
    }
`

export default GlobalStyles
