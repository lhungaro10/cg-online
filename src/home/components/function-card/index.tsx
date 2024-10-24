import { ButtonHTMLAttributes } from "react"
import { Container, Title } from "./styles"

interface FunctionCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string
}
export function FunctionCard(props : FunctionCardProps) {
    return (
        <Container
            onClick={props.onClick}
        >
            <Title>{props.title}</Title>
        </Container>
    )
}