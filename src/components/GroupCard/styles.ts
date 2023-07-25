import styled from "styled-components/native";
import { UsersThree } from "phosphor-react-native"
import { TouchableOpacity } from "react-native";

export const Container = styled(TouchableOpacity)`
    flex-direction: row;
    height: 96px;
    padding: 24px;
    align-items: center;
    gap: 20px;
    background-color: ${({theme}) => theme.COLORS.GRAY_500};
    border-radius: 6px;
    margin-bottom: 12px;
`

export const Icon = styled(UsersThree).attrs(({theme}) => ({
    color: theme.COLORS.GREEN_500,
    size: 32,
    weight: "fill"
}))``

export const Title = styled.Text`
    flex: 1;
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
    color: ${({theme}) => theme.COLORS.GRAY_100};
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
`