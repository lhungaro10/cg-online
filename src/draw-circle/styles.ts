import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 85vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props=> props.theme['blue-100']};
`

export const InfoContainer = styled.div`
    width: 100%;
    height: 15vh;
    display: flex;
    padding: 2rem 1rem;
    gap: 1rem;
`

export const DrawBox = styled.canvas`
    
    background-color: ${props=> props.theme['white']};

`