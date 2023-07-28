import { Container, Title, ButtonStyleProps } from "./styles"
import { TouchableOpacityProps} from "react-native"

type Props = TouchableOpacityProps & {
    title: string;
    type?: ButtonStyleProps
} 

export function Button({ title, type = "primary", ...rest }: Props) {
    return (
        <Container type={type} {...rest}>
            <Title>{title}</Title>
        </Container>
    )
}