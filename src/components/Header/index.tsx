import { BackButton, BackIcon, Container, Logo } from "./styles";
import logo from "@assets/logo.png"

interface Props {
    showBackButton?: boolean
}

export function Header({showBackButton = false}: Props) {
    return(
        <Container>
            {
                showBackButton && (
                    <BackButton>
                        <BackIcon />
                    </BackButton>
                )
            }
            <Logo source={logo}/>
        </Container>
    )
}