import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export type FilterStyleProps = {
    isActive?: boolean;
}

export const Container = styled(TouchableOpacity)<FilterStyleProps>`
    height: 38px;
    width: 160px;
    padding: 8px 0;

    justify-content: center;
    align-items: center;

    background-color: ${({theme}) => theme.COLORS.GRAY_600};
    border: solid 1px ${({isActive, theme}) => isActive ? theme.COLORS.GREEN_500 : theme.COLORS.GRAY_600 };
    border-radius: 6px;
`

export const Title = styled.Text`
    text-transform: uppercase;
    color: ${({theme}) => theme.COLORS.WHITE};
    font-size: ${({theme}) => theme.FONT_SIZE.SM}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
`