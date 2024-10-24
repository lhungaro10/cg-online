import styled from "styled-components";


export const Container = styled.div`
    width: 100%;
    height: 85vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Form = styled.form`
    width: 600px;
    height: 350px;
    border-radius: 8px;
    background-color: ${props=> props.theme['blue-400']};
    display: grid;
    padding: 1rem 4rem;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    justify-items: center;
    align-items: center;
`

export const Input = styled.input`
    width: 7rem;
    height: 3.5rem;
    text-align: center;
    border-radius: 8px;
    border: none;
    color: ${props=> props.theme['black']};
    font-size: 1rem;

    &::placeholder{
        font-size: 1rem;
        color: ${props=> props.theme['gray-600']};
    }
`



export const RadioContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 20rem;
    height: 10rem;
    border-radius: 8px;
    gap: 1rem;
`