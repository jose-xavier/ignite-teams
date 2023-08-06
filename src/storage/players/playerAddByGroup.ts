import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYERS_COLLECTION } from "@storage/storageConfig";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { playerGetByGroup } from "./playerGetByGroup";
import { AppError } from "@utils/AppError";


export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {

    try {
        const storedPlayers = await playerGetByGroup(group);

        const playerAlreadyExists = storedPlayers.filter(player => player.name === newPlayer.name);

        if(playerAlreadyExists.length > 0) {
            throw new AppError("Essa pessoa já está cadastrada em algum time aqui.")
        }

        const storage = JSON.stringify([...storedPlayers, newPlayer]);

        await AsyncStorage.setItem(`${PLAYERS_COLLECTION}:${group}`, storage);

    } catch (error) {
        throw error;
    }
}