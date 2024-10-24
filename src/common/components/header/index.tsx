import { HeadLine, Title } from "./styles";

interface HeaderProps{
    title: string
}
export function Header({ title }:HeaderProps){
    return(
        <HeadLine>
            <Title>{title}</Title>
        </HeadLine>
    )
}