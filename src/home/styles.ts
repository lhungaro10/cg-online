import styled from "styled-components";




export const MainContent = styled.main`
    width: 100%;
    height: 400px;
    background-color: ${props=> props.theme['blue-50']};
    padding: 1.5rem 2.5rem;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;

    justify-items: center;
    align-items: center;
    
    gap: 1rem;
` 