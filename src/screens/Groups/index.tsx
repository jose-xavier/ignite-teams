import { useCallback, useState }  from "react"
import { useNavigation, useFocusEffect } from "@react-navigation/native"

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { Alert, FlatList } from "react-native";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import { Container } from "./styles";
import { groupGetAll } from "@storage/group/groupGetAll";
import { Loading } from "@components/Loading";


export function Groups() {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ groups, setGroups ] = useState<string[]>([])

    function handleCreateNewGroup() {
        navigation.navigate('new')
    }

    function handleGoToPlayersScreen(group: string) {
        navigation.navigate('players', { group })
    }

    async function fecthGroups() {
        try {
            setIsLoading(true);
            const data = await groupGetAll()
            setGroups(data)
        } catch (error) {
            Alert.alert("Grupo", "Não foi possível carregar o grupo");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useFocusEffect(useCallback(() => {
        fecthGroups()
    }, []))

    const navigation = useNavigation()
    return (
        <Container>
            <Header/>
            <Highlight 
                title="Turmas"
                subtitle="jogue com a sua turma"
            />
        { isLoading 
            ?
                <Loading />
            :
                    <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({item}) => (
                    <GroupCard 
                        onPress={() => handleGoToPlayersScreen(item)}
                        name={item}
                    />
                )}
                contentContainerStyle={groups.length === 0 && {flex: 1}}
                ListEmptyComponent={() => (
                    <ListEmpty message="Que tal cadastrar o primeiro grupo?"/>
                )}
            />
        }


            <Button 
                title="Criar nova turma"
                onPress={handleCreateNewGroup}
            />
        </Container>
    );
}