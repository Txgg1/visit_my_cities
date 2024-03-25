import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import Database from "../Components/DataBase"; 

export default class FavoriteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
    };
  }

  componentDidMount() {
    this.fetchFavorites(); // Récupérer les favoris lors du montage du composant
  }

  fetchFavorites() {
    const userId = 1; // Remplacez 1 par l'ID de l'utilisateur connecté
    Database.getFavorites(userId)
      .then((results) => {
        const favorites = [];
        for (let i = 0; i < results.rows.length; i++) {
          favorites.push(results.rows.item(i));
        }
        this.setState({ favorites });
      })
      .catch((error) => {
        console.error("Error fetching favorites:", error);
      });
  }

  handleRemoveFavorite = (id) => {
    Database.removeFavorite(id)
      .then(() => {
        this.fetchFavorites(); // Rafraîchir la liste des favoris après la suppression
      })
      .catch((error) => {
        console.error("Error removing favorite:", error);
      });
  };

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.handleRemoveFavorite(item.id)} style={styles.item}>
      <Text>{item.buildingName}</Text>
    </TouchableOpacity>
  );

  render() {
    const { favorites } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={favorites}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text>No favorites found</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f9c2ff",
    borderRadius: 5,
  },
});
