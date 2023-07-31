import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupGetAll } from "./groupGetAll";

export async function groupCreate(newGroup: string) {

    try {
        const storedGroup = await groupGetAll();

        const newValue = JSON.stringify([...storedGroup, newGroup]);

        await AsyncStorage.setItem(GROUP_COLLECTION, newValue);

    } catch (error) {
        throw new Error();
    }
}