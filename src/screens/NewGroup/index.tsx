import { useState } from "react";
import { Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { groupCreate } from "@storage/group/groupCreate";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

import { Container, Content, Icon } from "./styles";
import { AppError } from "@utils/AppError";
import { groupGetAll } from "@storage/group/groupGetAll";




export function NewGroup() {
    const [ group, setGroup ] = useState('');
    const navigation = useNavigation();

    async function handleNew() {
        try {
            if(group.trim().length === 0) {
                return Alert.alert("Novo grupo", "Informe o nome da turma.")
            }

            await groupCreate(group)
            navigation.navigate("players", { group }); 

        } catch (error) {
            if( error instanceof AppError) {
                Alert.alert("Novo grupo", error.message);
            } else {
                Alert.alert("Novo grupo", "Não foi possui cadastrar o grupo.");
            }
        }
    }

    return (
        <Container>
            <Header showBackButton/>
            
            <Content>
                <Icon />

                <Highlight 
                title="Nova Turma"
                subtitle="Crie uma turma para adicionar pessoas"
                />
                <Input 
                    placeholder="Nome da turma"
                    onChangeText={text => setGroup(text)}
                />

                <Button 
                    title="Criar"
                    onPress={handleNew}
                />
            </Content>
        </Container>
    )
}