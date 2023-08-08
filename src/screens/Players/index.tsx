import { Alert, FlatList, TextInput} from "react-native"
import { useEffect, useRef, useState } from "react"
import { useRoute, useNavigation } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { ButtonIcon } from "@components/ButtonIcon";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import { playerAddByGroup } from "@storage/players/playerAddByGroup";
import { PlayerStorageDTO } from "@storage/players/PlayerStorageDTO";
import { playerGetByGroupAndTeam } from "@storage/players/playerGetByGroupAndTeam";
import { playerRemoveByGroup} from "@storage/players/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

import { AppError } from "@utils/AppError";

import { Container, Form, HeaderList, MembersCount } from "./styles";




type RouteParams = {
    group: string;
}


export function Players() {
    const [ newPlayerName, setNewPlayerName ] = useState("")
    const [ team, setTeam ] = useState("time A")
    const [ players, setPlayers ] = useState<PlayerStorageDTO[]>([])

    const navigation = useNavigation()
    const route = useRoute()
    const { group } = route.params as RouteParams;

    const newPlayerNameInputRef = useRef<TextInput>(null);

    async function handleAddPlayer() {
        if(newPlayerName.trim().length === 0) {
            return Alert.alert("Novo jogador", "Informe o nome da pessoa para adicionar.")
        }

        const newPlayer = {
            name: newPlayerName,
            team,
        }

        try {

            await playerAddByGroup(newPlayer, group);
            newPlayerNameInputRef.current?.blur();
            setNewPlayerName("");
            fetchPlayersByteam();

        } catch (error) {
            if(error instanceof AppError) {
                Alert.alert("Novo jogador", error.message)
            } else {
                Alert.alert("Novo jogador", "Não foi possível adicionar.")
            }
        }
    }

    async function handleRemovePlayer(playerName: string) {
        try {
            await playerRemoveByGroup(playerName, group);
            fetchPlayersByteam();

        } catch (error) {
            Alert.alert("Remover pessoa", "Não foi possível remover essa pessoa.");
            console.log(error);
        }
    }

    async function groupRemove() {
        try {
            await groupRemoveByName(group);
            navigation.navigate("groups");

        } catch (error) {
            Alert.alert("Remover grupo", "Não foi possível remover a turma.")
        }
    }

    async function handleRemoveGroup() {
            Alert.alert(
                "Remover grupo", 
                "Realmente deseja remover a turma?",[
                {
                    text: "Não",
                    style:"cancel"
                },
                {
                    text: "Sim", 
                    onPress: () => groupRemove()
                }
            ])
    }

    async function fetchPlayersByteam() {
        try {
            const players = await playerGetByGroupAndTeam(group, team);
            setPlayers(players);

        } catch (error) {
            Alert.alert("Lista", "Não foi possível carregar as pessoas do time selecionado.");
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPlayersByteam();
    }, [players])


    return (
        <Container>
            <Header showBackButton />
        
            <Highlight 
                title={group}
                subtitle="adicione a galera e separe os times"
            />

            <Form>
                <Input
                    inputRef={newPlayerNameInputRef}
                    onChangeText={setNewPlayerName} 
                    placeholder="Nome do participante"
                    value={newPlayerName}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
                />
                <ButtonIcon
                    onPress={handleAddPlayer}
                    icon="add"
                    type="primary"
                />
            </Form>

        <HeaderList>
            <FlatList 
                    data={["time A", "time B"]}
                    keyExtractor={item => item}
                    renderItem={({item}) => (
                        <Filter 
                        title={item}
                        isActive={item === team}
                        onPress={() => setTeam(item)}
                    />
                    )}
                    horizontal
                />
                <MembersCount>{players.length}</MembersCount>
        </HeaderList>

        <FlatList 
                    data={players}
                    keyExtractor={item => item.name}
                    renderItem={({item}) => (
                        <PlayerCard 
                        name={item.name}
                        onRemove={() => handleRemovePlayer(item.name) }
                    />
                    )}
                    ListEmptyComponent={() => (
                        <ListEmpty 
                            message="Não há pessoas nesse time"
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        {paddingBottom: 100},
                        players.length === 0 && {flex: 1}
                    ]}
                />

                <Button
                    onPress={handleRemoveGroup} 
                    title="Remover turma" 
                    type="secondary"
                />
        </Container>
    )
}