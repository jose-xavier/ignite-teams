import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context"

export const Container = styled(SafeAreaView)`
    flex: 1;
    padding: 24px;
    background-color: ${({theme}) => theme.COLORS.GRAY_600};
`;

export const Form = styled.View`
    max-height: 56px;
    max-height: 56px;

    flex-direction: row;
    background-color: ${({theme}) => theme.COLORS.GRAY_700};
    border-radius: 6px;
`

export const HeaderList = styled.View`
    flex-direction: row;
    width: 100%;
    margin: 32px 0 12px;

    justify-content: center;
    align-items: center;
`

export const MembersCount = styled.Text`
    font-size: ${({theme}) => theme.FONT_SIZE.SM}px;
    font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
    color: ${({theme}) => theme.COLORS.GRAY_100};
`