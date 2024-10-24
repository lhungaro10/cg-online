import styled from "styled-components"

export const HeadLine = styled.header`
    width: 100%;
    height: 15vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props)=> props.theme['blue-700']};
`

export const Title = styled.h1`
    font-size: 3rem;
    color: ${(props)=> props.theme['white']};
`