import { Alert, FlatList} from "react-native"
import { useEffect, useState } from "react"
import { useRoute } from "@react-navigation/native";

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

import { Container, Form, HeaderList, MembersCount } from "./styles";
import { playerGetByGroup } from "@storage/players/playerGetByGroup";
import { AppError } from "@utils/AppError";
import { playerGetByGroupAndTeam } from "@storage/players/playerGetByGroupAndTeam";

type RouteParams = {
    group: string;
}


export function Players() {
    const [ newPlayerName, setNewPlayerName ] = useState("")
    const [ team, setTeam ] = useState("time A")
    const [ players, setPlayers ] = useState<PlayerStorageDTO[]>([])

    const route = useRoute()
    const { group } = route.params as RouteParams;


    async function handleAddPlayer() {
        if(newPlayerName.trim().length === 0) {
            return Alert.alert("Novo jogador", "Informe o nome do jogador.")
        }

        const newPlayer = {
            name: newPlayerName,
            team,
        }

        try {

            await playerAddByGroup(newPlayer, group);
            fetchPlayersByteam();

        } catch (error) {
            if(error instanceof AppError) {
                Alert.alert("Novo jogador", error.message)
            } else {
                Alert.alert("Novo jogador", "Não foi possível cadastrar o jogador.")
            }
        }
    }

    async function fetchPlayersByteam() {
        try {
            const players = await playerGetByGroupAndTeam(group, team);
            setPlayers(players);

        } catch (error) {
            Alert.alert("Lista", "Não foi possivel carregar a lista de jogadores");
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
                    onChangeText={setNewPlayerName} 
                    placeholder="Nome do participante"
                    value={newPlayerName}
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
                        onRemove={() => { }}
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

                <Button title="Remover turma" type="secondary"/>
        </Container>
    )
}