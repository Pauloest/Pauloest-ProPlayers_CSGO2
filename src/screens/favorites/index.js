import React, { useState, useEffect } from "react";
import { Image, View, Text, ScrollView } from "react-native";
import { changeState, favoritesApi, players } from "../../api/index";
import { styles } from "./styles";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RectButton } from "react-native-gesture-handler";
import axios from "axios";

export const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [change, setChange] = useState();
  const route = useRoute();
  let newPlayer = route.params;

  /*
   * Faz uma requisição pro serviço de favoritos
   * Armazena os dados da resposta
   * Faz uma nova requisição pro serviço a cada remoção ou adição de jogador
   */
  useEffect(() => {
    async function fetchData() {
     await favoritesApi.get("favorites").then((response) => {
        setFavorites(response.data);
      });
    }
     fetchData();

  }, [change, newPlayer]);
  //   const route = useRoute();
  //   const idUser = route.params;
  //   const [dados, dadosSet] = useState([])
  //  //s d f
  //   // Salva os dados favoritos no storage
  //   const storeData = async (value) => {
  //     console.log("storeData")

  //     try {
  //       var listPlayers = JSON.parse(await AsyncStorage.getItem('players') || '[]');

  //       // Adiciona player aos favoritos

  //       listPlayers.push({
  //         value
  //       });

  //       // Salva a lista alterada
  //       AsyncStorage.setItem("players", JSON.stringify(listPlayers));

  //     } catch (e) {
  //       console.error(e)
  //     }
  //   }

  //   function storage() {
  //     console.log("storage")

  //     players.map((item) => {
  //       if (item.id == idUser.params) {
  //         storeData(item)
  //       }

  //     })
  //   }

  //   if (route.params) {
  //     var repeat = false
  //     dados.map((item) => {
  //       if (item.value.id === route.params.params) {
  //         repeat = true
  //       }
  //     })
  //     if (!repeat) {
  //       storage()
  //     }
  //   }

  //   async function getFavorites() {
  //     console.log("getFavorites")
  //     const listPlayers = JSON.parse(await AsyncStorage.getItem('players') || '[]');

  //     return listPlayers;
  //   }

  //   async function removeFavorite(id) {
  //     await AsyncStorage.removeItem(id)
  //   }

  //   useEffect(() => {
  //     async function fetchMyAPI() {
  //       let response = await getFavorites()
  //       dadosSet(response)
  //     }
  //     fetchMyAPI()
  //   }, [idUser])
  async function handleRemove(params) {
    try {
      await favoritesApi.delete(`${params}`).then((response) => {
        if (response.status == 200) {
          alert("Removed");
        }
      });
    } catch (e) {
      alert("Dont removed");
    }
    setChange(!change);
  }
  if (!favorites) return null;
  return (
    <ScrollView>
      <Text style={styles.title}> Minha Seleção de Jogadores</Text>
      <View style={styles.container}>
        {favorites.length > 0 &&
          favorites.map((item, index) => (
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
              <Text style={styles.textName}>{item.name}</Text>
              <RectButton
                style={styles.removetofavorites}
                onPress={() => handleRemove(item.id)}
              >
                <Text>Remover da Selecao</Text>
              </RectButton>
            </View>
          ))}
      </View>
    </ScrollView>
  );
};
