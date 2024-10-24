import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    * {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	html {
		font-size: 16px;
	}
	
	body {
		font-family: "Inter", sans-serif;
		font-size: 1em;
		color: ${(props)=> props.theme['black']};
		overflow-x: hidden;
	}

	button {
		border: none;
		cursor: pointer;
	}
`