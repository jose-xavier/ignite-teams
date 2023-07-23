import styled from "styled-components/native";
import { CaretLeft } from "phosphor-react-native"


export const Container = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 30px;
`

export const Logo = styled.Image`
    width: 45px;
    height: 55px;
`

export const BackButton = styled.TouchableOpacity`
    flex: 1;
`

export const BackIcon = styled(CaretLeft).attrs(({theme}) => ({
    size: 22,
    color: theme.COLORS.WHITE
}))``