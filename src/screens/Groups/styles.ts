import { FlatList } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    width: 100%;
    padding: 0 24px;
    background-color: ${({theme}) => theme.COLORS.GRAY_600 };
`

export const List = styled(FlatList)`
    
`