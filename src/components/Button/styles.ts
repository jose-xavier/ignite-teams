import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export type ButtonStyleProps = "primary" | "secondary"

type ButtonType = {
    type: ButtonStyleProps
}


export const Container = styled(TouchableOpacity)<ButtonType>`
    width: 100%;
    min-height: 56px;
    max-height: 56px;

    margin-top: 16px;
    padding: 16px;
    border-radius: 6px;
    justify-content: center;
    align-items: center;
    background-color: ${({type, theme}) => type === "primary" ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};
`

export const Title = styled.Text`
    color: ${({theme}) => theme.COLORS.WHITE};
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    font-size: ${({theme}) => theme.FONT_SIZE.SM}px;
`