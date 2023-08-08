import { PLAYERS_COLLECTION } from "@storage/storageConfig";
import { playerGetByGroup } from "./playerGetByGroup";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function playerRemoveByGroup(playerName: string, group: string) {
    try {
        const storage = await playerGetByGroup(group);

        const players = storage.filter( player => player.name !== playerName);

        await AsyncStorage.setItem(`${PLAYERS_COLLECTION}-${group}`, JSON.stringify(players));

    } catch (error) {
        throw error;
    }
}