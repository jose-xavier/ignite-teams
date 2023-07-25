import { Container, Title, Icon } from "./styles";
import { TouchableOpacityProps } from 'react-native'

type Props = TouchableOpacityProps & {
    name: string;
}
 
export function GroupCard({ name, ...rest }: Props) {
    return (
        <Container {...rest}>
            <Icon />
            <Title>{name}</Title>
        </Container>
    )
}