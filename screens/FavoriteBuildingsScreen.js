import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
  Image,
  Dimensions,
} from "react-native";
import {
  BuildingDetailsText,
  BuildingDetailsScrollView,
} from "../Components/BuildingText";

class FavoriteBuildingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteBuildings: [],
      selectedBuilding: null,
      modalVisible: false,
      buildingPhotos: [], // Ajout d'un état pour stocker les photos du bâtiment
      buildingArchitect: [], // Ajout d'un état pour stocker les architectes du bâtiment
    };
  }

  componentDidMount() {
    this.fetchFavoriteBuildings();
  }

  async fetchArchitects(building_id) {
    try {
      const response = await fetch(
        `http://10.31.251.154:8080/buildings/${building_id}/architects`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch architects");
      }
      const architects = await response.json();
      return architects;
    } catch (error) {
      console.error("Error fetching architects:", error);
      throw error;
    }
  }

  async fetchBuildingPhotos(buildingId) {
    try {
      const response = await fetch(
        `http://10.31.251.154:8080/buildings/${buildingId}/photos`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch building photos");
      }
      const photos = await response.json();
      return photos;
    } catch (error) {
      console.error("Error fetching building photos:", error);
      throw error;
    }
  }

  fetchFavoriteBuildings = async () => {
    const userId = this.props.user.id;
    try {
      const response = await fetch(
        `http://10.31.251.154:8080/users/${userId}/buildings`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch favorite buildings");
      }
      const data = await response.json();
      this.setState({ favoriteBuildings: data });
    } catch (error) {
      console.error("Error fetching favorite buildings:", error);
    }
  };

  handleRemoveFromFavorites = async (buildingId) => {
    const userId = this.props.user.id;
    try {
      const response = await fetch(
        `http://10.31.251.154:8080/users/${userId}/buildingToRemove/${buildingId}`,
        {
          method: "PATCH",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to remove building from favorites");
      }
      // Mettre à jour la liste des bâtiments favoris après la suppression
      this.setState((prevState) => ({
        favoriteBuildings: prevState.favoriteBuildings.filter(
          (building) => building.id !== buildingId
        ),
      }));
    } catch (error) {
      console.error("Error removing building from favorites:", error);
    }
  };

  handleBuildingPress = async (building) => {
    // Ajout de "async" ici
    this.setState({ selectedBuilding: building, modalVisible: true });
    try {
      const photos = await this.fetchBuildingPhotos(building.id); // Utilisation de "building.id"
      this.setState({ buildingPhotos: photos });
      const architects = await this.fetchArchitects(building.id); // Utilisation de "building.id"
      this.setState({ buildingArchitect: architects });
    } catch (error) {
      console.error("Error fetching building photos:", error);
    }
  };

  handlePhotoPress = (photo) => {
    this.setState({ selectedPhoto: photo });
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  render() {
    const {
      favoriteBuildings,
      modalVisible,
      selectedBuilding,
      buildingArchitect,
      buildingPhotos,
    } = this.state;
    const userId = this.props.user.id;

    const dimensions = Dimensions.get("window");
    const imageWidth = dimensions.width;
    const imageHeight = dimensions.height;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mes Bâtiments Favoris {userId}</Text>
        <FlatList
          data={favoriteBuildings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.handleBuildingPress(item)}>
              <Text style={styles.buildingItem}>{item.name}</Text>
              <TouchableOpacity
                onPress={() => this.handleRemoveFromFavorites(item.id)}
              >
                <Text style={styles.removeButton}>Supprimer des favoris</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={this.closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedBuilding?.name}</Text>
              <Text>{selectedBuilding?.address}</Text>
              <BuildingDetailsText
                label="Nom du bâtiment"
                value={selectedBuilding?.name}
              />
              <BuildingDetailsText
                label="Adresse"
                value={selectedBuilding?.address}
              />
              <BuildingDetailsScrollView
                label="Description"
                value={selectedBuilding?.description}
              />
              <BuildingDetailsText
                label="Date de début de construction"
                value={selectedBuilding?.startBuild}
              />
              <BuildingDetailsText
                label="Date de fin de construction"
                value={selectedBuilding?.endBuild}
              />
              <BuildingDetailsText label="Architectes" />
              {/* {console.log(this.state.buildingArchitect)} */}
              <FlatList
                data={buildingArchitect}
                renderItem={({ item }) => (
                  <Text>
                    {item.name} {item.firstname}
                  </Text>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
              <BuildingDetailsText
                label="Latitude"
                value={selectedBuilding?.latitude}
              />
              <BuildingDetailsText
                label="Longitude"
                value={selectedBuilding?.longitude}
              />
              <FlatList
                style={styles.photosList}
                data={buildingPhotos}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => this.handlePhotoPress(item)}>
                    <Image source={{ uri: item.url }} style={styles.image} />
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
              />
              <Button title="Fermer" onPress={this.closeModal} />
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!this.state.selectedPhoto}
          onRequestClose={() => this.setState({ selectedPhoto: null })}
        >
          {/* Contenu du modal pour afficher la photo sélectionnée */}
          <View style={styles.modalContentImage}>
            <Image
              source={{ uri: this.state.selectedPhoto?.url }}
              style={{ height: imageHeight, width: imageWidth }}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => this.setState({ selectedPhoto: null })}
            >
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buildingItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  removeButton: {
    color: "red",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: width / 3.5 - 10,
    height: 150,
    margin: 5,
  },
  photosList: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
  modalContentImage: {
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 5,
    padding: 5,
  },
  closeButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
});

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(FavoriteBuildingsScreen);
