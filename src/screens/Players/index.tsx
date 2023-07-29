import { FlatList} from "react-native"
import { useState } from "react"
import { useRoute } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { ButtonIcon } from "@components/ButtonIcon";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import { Container, Form, HeaderList, MembersCount } from "./styles";


type RouteParams = {
    group: string;
}


export function Players() {
    const [ team, setTeam ] = useState("time A")
    const [ players, setPlayers ] = useState(["Netto", "Iury"])

    const route = useRoute()
    const { group } = route.params as RouteParams;

    return (
        <Container>
            <Header showBackButton />
        
            <Highlight 
                title={group}
                subtitle="adicione a galera e separe os times"
            />

            <Form>
                <Input placeholder="Nome do participante"/>
                <ButtonIcon 
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
                    keyExtractor={item => item}
                    renderItem={({item}) => (
                        <PlayerCard 
                        name={item}
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