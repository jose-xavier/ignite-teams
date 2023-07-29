import { useNavigation } from "@react-navigation/native"

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

import { Container, Content, Icon } from "./styles";
import { useState } from "react";


export function NewGroup() {
    const [ group, setGroup ] = useState('');
    const navigation = useNavigation();

    function handleNew() {
        navigation.navigate("players", { group }); 
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