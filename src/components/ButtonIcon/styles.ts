import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export type ButtonIconStyleProps = "primary" | "secondary"

type ButtonType = {
    type: ButtonIconStyleProps
}

export const Container = styled(TouchableOpacity)`
    height: 56px;
    width: 56px;

    justify-content: center;
    align-items: center;

    margin-left: 12px;
`;

export const Icon = styled(MaterialIcons).attrs<ButtonType>(({ theme, type }) => ({
    size: 24,
    color: type === "primary" ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK
}))``; 