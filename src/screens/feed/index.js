import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { RectButton } from "react-native-gesture-handler";
// import { players } from '../../api/index'
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { favoritesApi, playersApi } from "../../api";

export const Feed = () => {
  const navigation = useNavigation();
  const [players, setPlayers] = useState();

  useEffect(() => {
    async function fecthData() {
      await playersApi.get("players").then((response) => {
        setPlayers(response.data);
      });
    }
    fecthData();
  }, []);

  async function handleFavorites(params) {
    try {
      await favoritesApi.post("create-favorite", params).then((response) => {
        if (response.status == 201) {
          navigation.navigate("Favorites", { params });
        }
      });
    } catch (e) {
      alert("This player already exist in your favorites colection ");
    }
  }
  if (!players) return (<>Não há dados..</>);
  return (
    <ScrollView>
      <Text style={styles.title}> Jogadores Pro</Text>
      <View style={styles.container}>
        {players.length > 0 &&
          players.map((item, index) => (
            <View key={index} style={styles.content}>
              <Image
                source={item.avatar}
                S
                style={{
                  width: 150,
                  height: 200,
                  borderRadius: 15,
                  padding: 5,
                }}
                resizeMode="cover"
              ></Image>
              <Text key={item.name} style={styles.textName}>
                {item.name}
              </Text>
              <Text style={styles.textTeam}>{item.team}</Text>
              <Text style={styles.textScore}>{item.score}</Text>
              <RectButton
                style={styles.addtofavorites}
                onPress={() => handleFavorites(item)}
              >
                <Text>Adicione a Selecao</Text>
              </RectButton>
            </View>
          ))}
      </View>
    </ScrollView>
  );
};
