import { ButtonHTMLAttributes } from "react"
import { Container, Title } from "./styles"
import { Link } from "react-router-dom"

interface FunctionCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string
    nav: string
}
export function FunctionCard(props : FunctionCardProps) {
    return (
        
        <Link
            to={props.nav}
        >
            <Container
                onClick={props.onClick}
                >
                <Title>{props.title}</Title>
            </Container>
        
        </Link>
    )
}