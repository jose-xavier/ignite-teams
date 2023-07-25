import { useState }  from "react"
import { Header } from "@components/Header";
import { Container } from "./styles";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { FlatList } from "react-native";
import { ListEmpty } from "@components/ListEmpty";

export function Groups() {
    const [ groups, setGroups ] = useState<string[]>(["Time A", "Time B"])

    return (
        <Container>
            <Header/>
            <Highlight 
                title="Turmas"
                subtitle="jogue com a sua turma"
            />
            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({item}) => (
                    <GroupCard name={item}/>
                )}
                contentContainerStyle={groups.length === 0 && {flex: 1}}
                ListEmptyComponent={() => (
                    <ListEmpty message="Que tal cadastrar o primeiro grupo?"/>
                )}
            />
        </Container>
    );
}