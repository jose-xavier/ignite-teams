import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons"

export const Container = styled.View`
    width: 100%;
    height: 56px;
    margin-top: 12px;
    flex-direction: row;
    align-items: center;
    background-color: ${({theme}) => theme.COLORS.GRAY_500};
    border-radius: 6px;
`

export const Icon = styled(MaterialIcons).attrs(({theme}) => ({
    size: 24,
    color: theme.COLORS.GRAY_100,
}))`
    margin-left: 16px;
    margin-right: 4px;
`

export const Name = styled.Text`
    flex: 1;
    margin-left: 6px;
    font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
    color: ${({theme}) => theme.COLORS.GRAY_200};
`