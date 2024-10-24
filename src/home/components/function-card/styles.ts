import styled from "styled-components";

export const Container = styled.button`
    width: 10rem;
    height: 3.5rem;
    background-color: ${(props)=> props.theme['blue-700']};
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

`   

export const Title = styled.h2`
    color: ${(props)=> props.theme['white']};
`

// 440 / 16 = 27.5rem 