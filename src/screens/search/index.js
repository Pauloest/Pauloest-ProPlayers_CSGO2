import React, { useEffect, useState } from 'react'
import { Image, View, Text, ScrollView, TextInput } from "react-native"
import { RectButton } from 'react-native-gesture-handler'
// import { players } from '../../api/index'
import { styles } from "./styles"
import { useNavigation } from '@react-navigation/native'
import { playersApi } from '../../api'

export const Search = () => {
    const [playerName, setPlayerName] = useState()
    const [playerSelected, setPlayerSelected] = useState([])
    const [players, setPlayers] = useState();
  

    useEffect(() => {
      playersApi.get("players").then((response) => {
        setPlayers(response.data);
      });
    }, []);

    function playerNameInputHandler(value) {
        setPlayerName(value)
    }

    function searchPlayer(value) {
        const search = players.filter((item) => item.name.toLocaleLowerCase().match(value.toLocaleLowerCase()))

        setPlayerSelected(search)
    }
    const navigation = useNavigation()

    function handleFavorites(params) {
        navigation.navigate('Favorites', {params})
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={playerNameInputHandler}
                />
                <RectButton
                    activeOpacity={0.7}
                    style={styles.button}
                    onPress={() => searchPlayer(playerName)}
                >
                    <Text style={styles.buttonText}>Pesquisar Jogador</Text>
                </RectButton>
            </View>
            {
                playerSelected.length > 0 && playerSelected.map((item, index) =>
                    <View key={index} style={styles.content}>
                        <Image source={item.avatar} style={{ width: 150, height: 200, borderRadius: 15, padding: 5 }}
                            resizeMode="cover">
                        </Image>
                        <Text key={item.name} style={styles.textName}>{item.name}</Text>
                        <Text style={styles.textTeam}>{item.team}</Text>
                        <RectButton style={styles.addtofavorites}
                            onPress={() => handleFavorites(item.id)}>
                            <Text>Adicionar a selecao</Text>
                        </RectButton>

                    </View>
                )
            }
        </ScrollView>
    )
}