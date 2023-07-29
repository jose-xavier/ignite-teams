import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context"

export const Container = styled(SafeAreaView)`
    flex: 1;
    width: 100%;
    padding: 24px;
    background-color: ${({theme}) => theme.COLORS.GRAY_600 };
`
