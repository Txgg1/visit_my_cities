import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
  Button,
  FlatList,
  Image,
  ScrollView,
  Dimensions,
  Alert
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import {
  BuildingDetailsScrollView,
  BuildingDetailsText,
} from "../Components/BuildingText";
import * as ImagePicker from "expo-image-picker"; // Importez le module pour la sélection d'image
import BuildingTypePicker from "../Components/BuildingTypePicker";
import local from "../Components/ipconfig";

export default class LocalisationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null, // Emplacement actuel de l'utilisateur
      errMessage: null, // Message d'erreur en cas de problème avec la localisation
      region: {
        // Région par défaut affichée sur la carte
        latitude: 48.249564,
        longitude: 7.472165,
        latitudeDelta: 1.5,
        longitudeDelta: 1.5,
      },
      showMenu: false, // Indique si le menu est visible ou non
      isAddingMarker: false, // Indique si l'utilisateur est en train d'ajouter un marqueur
      markers: [], // Liste des marqueurs ajoutés par l'utilisateur
      markerName: "", // Nom du marqueur saisi par l'utilisateur
      modalVisible: false, // Indique si la boîte de dialogue modale est visible ou non
      selectedMarker: null, // Marqueur sélectionné par l'utilisateur
      buildings: [], // Liste des bâtiments récupérés depuis le backend
      selectedPhoto: null, // Photo sélectionnée pour affichage dans le modal
      architects: [], // Liste des architectes
      buildingTypes: [], // Liste des types de bâtiments
      selectedBuildingType: null, // Type de bâtiment sélectionné
      isBuildingTypeModalVisible: false,
      isCityModalVisible: false,
      markerCoordinates: null,
      editingBuilding: null,
      isEditingModalVisible: false,
      form: {
        newName: "",
        newAddress: "",
        newStartBuild: "",
        newEndBuild: "",
        newDescription: "",
      },
    };
    this.onRegionChange = this.onRegionChange.bind(this);
    this.handleRemoveMarker = this.handleRemoveMarker.bind(this); // Binder la méthode handleRemoveMarker
  }

  componentDidMount() {
    this.useEffect();
    this.fetchBuildings(); // Appeler la méthode fetchBuildings lorsque le composant est monté
    this.fetchBuildingTypes();
    this.fetchCities();
  }

  async useEffect() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      this.setState({ errMessage: "Permission denied" }); // Mettre à jour le message d'erreur si la permission est refusée
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location: location }); // Mettre à jour l'emplacement actuel de l'utilisateur
  }

  onRegionChange() {
    this.setState({
      region: {
        // Mettre à jour la région de la carte en fonction du mouvement de l'utilisateur
        latitudeDelta: 1.5,
        longitudeDelta: 1.5,
      },
    });
  }

  openEditingModal = (building) => {
    this.setState({
      editingBuilding: building,
      isEditingModalVisible: true,
    });
  };

  closeEditingModal = () => {
    this.setState({
      editingBuilding: null,
      isEditingModalVisible: false,
    });
  };

  toggleBuildingTypeModal = () => {
    this.setState((prevState) => ({
      isBuildingTypeModalVisible: !prevState.isBuildingTypeModalVisible,
    }));
  };

  toggleCityModal = () => {
    this.setState((prevState) => ({
      isCityModalVisible: !prevState.isCityModalVisible,
    }));
  };
  a;

  handleAddMarker = () => {
    if (!this.state.isAddingMarker) {
      this.setState({ isAddingMarker: true }); // Activer le mode d'ajout de marqueur
    }
  };

  handleMapPress = (event) => {
    if (this.state.isAddingMarker) {
      this.tempMarkerCoordinate = event.nativeEvent.coordinate;
      this.setState({
        markers: [
          ...this.state.markers,
          { coordinate: event.nativeEvent.coordinate },
        ],
        modalVisible: true,
      });
    }
  };

  addMarker = () => {
    this.setState({
      isAddingMarker: true,
      markers: [
        ...this.state.markers,
        { coordinate: this.state.markerCoordinates },
      ],
    });
  };

  handleConfirmMarker = () => {
    const newMarkers = [...this.state.markers];
    newMarkers.push({
      coordinate: this.tempMarkerCoordinate,
      title: this.state.markerName || `Marqueur ${newMarkers.length + 1}`, // Utiliser le nom du marqueur saisi ou un nom par défaut
    });
    this.setState({ markers: newMarkers, modalVisible: false, markerName: "" });
  };

  handleMarkerPress = async (marker) => {
    this.setState({ selectedMarker: marker });
    try {
      const photos = await this.fetchBuildingPhotos(marker.id); // Supposons que marker.id soit l'identifiant du bâtiment
      this.setState({ buildingPhotos: photos });
      const architects = await this.fetchArchitects(marker.id); // Supposons que marker.id soit l'identifiant du bâtiment
      this.setState({ buildingArchitect: architects });
    } catch (error) {
      console.error("Error fetching building photos:", error);
    }
  };

  handleRemoveMarker = () => {
    const { markers, selectedMarker } = this.state;
    const filteredMarkers = markers.filter(
      (marker) => marker !== selectedMarker
    );
    this.setState({ markers: filteredMarkers, selectedMarker: null }); // Supprimer le marqueur sélectionné de la liste
  };

  handlePhotoPress = (photo) => {
    this.setState({ selectedPhoto: photo });
  };

  closePhotoModal = () => {
    this.setState({ selectedPhoto: null });
  };

  handleAddBuilding = () => {
    this.setState({ isAddBuildingModalVisible: true });
  };

  handleSubmit = async () => {
    const { name, address, description, startBuild, endBuild, type } =
      this.state;

    const newBuilding = {
      name,
      address,
      description,
      startBuild: parseInt(startBuild),
      endBuild: parseInt(endBuild),
      latitude: this.tempMarkerCoordinate.latitude,
      longitude: this.tempMarkerCoordinate.longitude,
      type: {
        id: this.state.selectedBuildingType,
      },
    };

    try {
      const response = await fetch("http://10.31.251.154:8080/buildings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBuilding),
      });
      if (response.ok) {
        // Le bâtiment a été ajouté avec succès
        this.setState({ modalVisible: false });
      } else {
        // La requête a échoué
        console.error("Failed to add building");
        throw new Error("Failed to add building");
      }
    } catch (error) {
      console.error("Error adding building:", error);
    }
  };

  handleAddPhoto = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert(
          "La permission d'accès à la galerie est nécessaire pour sélectionner une photo."
        );
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Sélectionner uniquement les images
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!pickerResult.cancelled) {
        // Envoyer la photo sélectionnée au backend et l'associer au bâtiment approprié
        await this.uploadPhotoToServer(pickerResult.uri);
        alert("Photo ajoutée avec succès !");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la photo :", error);
      alert("Une erreur s'est produite lors de l'ajout de la photo.");
    }
  };

  uploadPhotoToServer = async (uri) => {
    try {
      const requestBody = {
        uri: uri,
        type: "image/jpeg",
        name: "building_photo.jpg",
      };

      const response = await fetch(
        `http://10.31.251.154:8080/photos/building/${this.state.selectedMarker.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to upload photo to server and associate it with the building"
        );
      }
    } catch (error) {
      console.error("Error adding photo to building:", error);
      throw error;
    }
  };

  // Ajoutez cette fonction à votre classe LocalisationScreen
  handleResetFilters = () => {
    this.setState({
      selectedBuildingType: null,
      selectedCity: null,
      filteredMarkers: [], // Réinitialiser les marqueurs filtrés
      region: {
        // Réinitialiser la région de la carte aux valeurs par défaut
        latitude: 48.249564,
        longitude: 7.472165,
        latitudeDelta: 1.5,
        longitudeDelta: 1.5,
      },
    });
  };

  handleTypeSelection = (selectedType) => {
    this.setState({ selectedBuildingType: selectedType });
    this.setState({ selectedType });
  };

  handleGoToCityList = () => {
    this.props.navigation.navigate("CityListScreen");
  };

  renderFilteredBuildings() {
    const { buildings, selectedBuildingType } = this.state;
    if (!selectedBuildingType) {
      return buildings.map((building, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: building.latitude,
            longitude: building.longitude,
          }}
          title={building.name}
          onPress={() => this.handleMarkerPress(building)}
        />
      ));
    } else if (selectedBuildingType && selectedBuildingType.id) {
      const filteredBuildings = buildings.filter(
        (building) =>
          building.type && building.type.id === selectedBuildingType.id
      );
      return filteredBuildings.map((building, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: building.latitude,
            longitude: building.longitude,
          }}
          title={building.name}
          onPress={() => this.handleMarkerPress(building)}
        />
      ));
    }
  }

  renderBuildingTypesList = () => {
    return this.state.buildingTypes.map((type) => (
      <TouchableOpacity
        key={type.id}
        onPress={() => this.handleTypeSelection(type)}
        style={[
          styles.buildingTypeItem,
          this.state.selectedBuildingType === type.id &&
            styles.selectedBuildingType,
        ]}
      >
        <Text>{type.name}</Text>
      </TouchableOpacity>
    ));
  };

  filterBuildingByType = (building) => {
    const { selectedBuildingType } = this.state;
    if (!selectedBuildingType) {
      return true; // Si aucun filtre n'est sélectionné, afficher tous les bâtiments
    }
    return building.type.id === selectedBuildingType.id;
  };

  async fetchBuildingTypes() {
    try {
      const response = await fetch("http://10.31.251.154:8080/types");
      if (!response.ok) {
        throw new Error("Failed to fetch building types");
      }
      const buildingTypes = await response.json();
      this.setState({ buildingTypes });
    } catch (error) {
      console.error("Error fetching building types:", error);
      alert("An error occurred while retrieving the building types.");
    }
  }

  async fetchBuildingsByType(typeId) {
    try {
      const response = await fetch(
        `http://10.31.251.154:8080/buildings/type/${typeId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch buildings by type");
      }
      const filteredBuildings = await response.json();
      this.setState({ filteredBuildings });
    } catch (error) {
      console.error("Error fetching buildings by type:", error);
      alert("An error occurred while retrieving the buildings.");
    }
  }

  async fetchCities() {
    try {
      const response = await fetch("http://10.31.251.154:8080/cities");
      if (!response.ok) {
        throw new Error("Failed to fetch cities");
      }
      const cities = await response.json();
      this.setState({ cities });
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  }

  async fetchCityCoordinates(cityId) {
    try {
      const response = await fetch(
        `http://10.31.251.154:8080/cities/${cityId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch city coordinates");
      }
      const city = await response.json();
      return city;
    } catch (error) {
      console.error("Error fetching city coordinates:", error);
      throw error;
    }
  }

  handleCitySelection = async (city) => {
    try {
      const selectedCity = await this.fetchCityCoordinates(city.id);
      this.setState({
        selectedCity: selectedCity,
        region: {
          latitude: selectedCity.latitude,
          longitude: selectedCity.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        },
      });
      this.toggleCityModal(); // Ajoutez cette ligne pour fermer le modal
    } catch (error) {
      console.error("Error handling city selection:", error);
    }
  };

  renderCityList() {
    return this.state.cities.map((city) => (
      <TouchableOpacity
        key={city.id}
        onPress={() => this.handleCitySelection(city)}
      >
        <Text>{city.name}</Text>
      </TouchableOpacity>
    ));
  }

  async fetchBuildings() {
    try {
      const response = await fetch("http://10.31.251.154:8080/buildings"); // Récupérer les bâtiments depuis le backend

      if (!response.ok) {
        throw new Error("Failed to fetch buildings");
      }
      const buildings = await response.json();
      this.setState({ buildings }); // Mettre à jour la liste des bâtiments récupérés
    } catch (error) {
      console.error("Error fetching buildings:", error); // Gérer les erreurs lors de la récupération des bâtiments
    }
  }
  async fetchBuildingPhotos(building_id) {
    try {
      const response = await fetch(
        `http://10.31.251.154:8080/buildings/${building_id}/photos`
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
  handleEditButtonPress = (building) => {
    this.setState({
      editingBuilding: building,
    });
  };

  updateBuilding = () => {
    const { form, editingBuilding } = this.state;
    const updatedBuilding = {
      id: editingBuilding.id,
      name: form.newName || editingBuilding.name,
      address: form.newAddress || editingBuilding.address,
      startBuild: form.newStartBuild || editingBuilding.startBuild,
      endBuild: form.newEndBuild || editingBuilding.endBuild,
      description: form.newDescription || editingBuilding.description,
    };

    fetch(`http://10.31.251.154:8080/buildings/${editingBuilding.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBuilding),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          building: updatedBuilding,
          modalVisible: false,
        });
        Alert.alert('Succès', 'Les modifications ont été enregistrées avec succès.');
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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

  render() {
    const dimensions = Dimensions.get("window");
    const imageWidth = dimensions.width;
    const imageHeight = dimensions.height;
    const {
      selectedBuildingType,
      buildingTypes,
      buildings,
      selectedMarker,
      modalVisible,
      selectedPhoto,
    } = this.state;

    const filteredBuildings = selectedBuildingType
      ? buildings.filter(
          (building) => building.type.id === selectedBuildingType.id
        )
      : buildings;

    return (
      <View style={styles.container}>
        <View>
          {/* Autres éléments existants */}

          {/* Autres éléments existants */}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isBuildingTypeModalVisible}
          onRequestClose={this.toggleBuildingTypeModal}
        >
          <View style={styles.modalContainerType}>
            <View style={styles.modalContentType}>
              <Text>Sélectionner un type de bâtiment :</Text>
              <FlatList
                data={this.state.buildingTypes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ selectedBuildingType: item });
                      this.toggleBuildingTypeModal();
                    }}
                  >
                    <Text style={styles.menuItem}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
              <Button title="Fermer" onPress={this.toggleBuildingTypeModal} />
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isCityModalVisible}
          onRequestClose={this.toggleCityModal}
        >
          <View style={styles.modalContainerType}>
            <View style={styles.modalContentType}>
              {/* Contenu du modal, par exemple une FlatList pour afficher la liste des villes */}
              <FlatList
                data={this.state.cities}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => this.handleCitySelection(item)}
                  >
                    <Text style={styles.menuItem}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
              {/* {console.log(this.state.cities)} */}
              {/* Bouton pour fermer le modal */}
              <Button title="Fermer" onPress={this.toggleCityModal} />
            </View>
          </View>
        </Modal>

        {/* Boîte de dialogue modale pour ajouter un marqueur */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: false });
          }}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Ajouter un bâtiment</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom"
              value={this.state.name}
              onChangeText={(text) => this.setState({ name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Adresse"
              value={this.state.address}
              onChangeText={(text) => this.setState({ address: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={this.state.description}
              onChangeText={(text) => this.setState({ description: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Date de début de construction"
              value={this.state.startBuild}
              onChangeText={(text) => this.setState({ startBuild: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Date de fin de construction"
              value={this.state.endBuild}
              onChangeText={(text) => this.setState({ endBuild: text })}
            />

            <Picker
              selectedValue={this.state.selectedBuildingType}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ selectedBuildingType: itemValue })
              }
            >
              <Picker.Item label="Sélectionner un type" value="" />
              {this.state.buildingTypes &&
                this.state.buildingTypes.map(
                  (type) =>
                    type &&
                    type.id && (
                      <Picker.Item
                        label={type.id + " - " + type.label}
                        value={type.id}
                        key={type.id}
                      />
                    )
                )}
            </Picker>

            {/*<TextInput*/}
            {/*  style={styles.input}*/}
            {/*  placeholder="Type de bâtiment"*/}
            {/*  value={this.state.type}*/}
            {/*  onChangeText={(text) => this.setState({ type: text })}*/}
            {/*/>*/}
            {/*<TextInput*/}
            {/*  style={styles.input}*/}
            {/*  placeholder="Architectes"*/}
            {/*  value={this.state.architects}*/}
            {/*  onChangeText={(text) => this.setState({ architects: text })}*/}
            {/*/>*/}
            <Button title="Ajouter" onPress={this.handleSubmit} />
          </View>
        </Modal>

        {/* Bouton pour ouvrir/fermer le menu */}
        <TouchableOpacity
          style={styles.menuToggle}
          onPress={() => this.setState({ showMenu: !this.state.showMenu })}
        >
          <Text style={styles.menuToggleText}>
            {this.state.showMenu ? "Fermer" : "Menu"}
          </Text>
        </TouchableOpacity>
        {this.state.showMenu && (
          <View style={styles.menu}>
            {/* Bouton pour ajouter un marqueur */}
            <TouchableOpacity onPress={this.addMarker}>
              <Text style={styles.menuItem}>Ajouter un marqueur</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.toggleBuildingTypeModal}>
              <Text style={styles.menuItem}>
                Sélectionner un type de bâtiment
              </Text>
            </TouchableOpacity>

            {/* <ScrollView>{this.renderBuildingTypesList()}</ScrollView> */}
            <TouchableOpacity onPress={this.toggleCityModal}>
              <Text style={styles.menuItem}>Liste des villes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleResetFilters}>
              <Text style={styles.menuItem}>Réinitialiser les filtres</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Carte affichant les marqueurs des bâtiments */}
        <MapView
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          onPress={this.handleMapPress}
        >
          {filteredBuildings.map((building, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: building.latitude,
                longitude: building.longitude,
              }}
              title={building.name}
              onPress={() => this.handleMarkerPress(building)} // Mettre à jour le marqueur sélectionné
            />
          ))}
        </MapView>

        {/* Fenêtre modale pour afficher les détails du marqueur sélectionné */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!this.state.selectedMarker}
          onRequestClose={() => this.setState({ selectedMarker: null })}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* {console.log(this.state.selectedMarker?.id)} */}

              <BuildingDetailsText
                title="Nom du bâtiment"
                value={
                  this.state.selectedMarker?.name
                    ? this.state.selectedMarker?.name
                    : "Pas de nom"
                }
              />
              <BuildingDetailsText
                title="Adresse"
                value={
                  this.state.selectedMarker?.address
                    ? this.state.selectedMarker?.address
                    : "Pas d'adresse"
                }
              />
              <BuildingDetailsScrollView
                title="Description"
                value={
                  this.state.selectedMarker?.description
                    ? this.state.selectedMarker?.description
                    : "Pas de description"
                }
              />
              <BuildingDetailsText
                title="Date de début de construction"
                value={
                  this.state.selectedMarker?.startBuild
                    ? this.state.selectedMarker?.startBuild
                    : "Pas de date de début de construction"
                }
              />
              <BuildingDetailsText
                title="Date de fin de construction"
                value={
                  this.state.selectedMarker?.endBuild
                    ? this.state.selectedMarker?.endBuild
                    : "Pas de date de fin de construction"
                }
              />
              <BuildingDetailsText title="Architectes" />
              <FlatList
                data={this.state.buildingArchitect}
                renderItem={({ item }) => (
                  <Text>
                    {item.name} {item.firstname}
                  </Text>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
              <BuildingDetailsText
                title="Type"
                value={
                  this.state.selectedMarker?.type.label
                    ? this.state.selectedMarker?.type.label
                    : "Pas de type"
                }
              />
              <BuildingDetailsText
                title="Latitude"
                value={this.state.selectedMarker?.latitude}
              />

              <BuildingDetailsText
                title="Longitude"
                value={this.state.selectedMarker?.longitude}
              />
              <FlatList
                style={styles.photosList}
                data={this.state.buildingPhotos}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => this.handlePhotoPress(item)}>
                    <Image source={{ uri: item.url }} style={styles.image} />
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
              />
              <TouchableOpacity
                onPress={() => this.openEditingModal(this.state.selectedMarker)}
              >
                <Text>Modifier</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.handleAddPhoto}>
                <Text>Ajouter une photo</Text>
              </TouchableOpacity>
              <Button title="Supprimer" onPress={this.handleRemoveMarker} />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => this.setState({ selectedMarker: null })}
              >
                <Text style={styles.closeButtonText}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isEditingModalVisible}
          onRequestClose={this.closeEditingModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Modifier les détails du building
              </Text>
              <TextInput
                style={styles.input}
                placeholder={this.state.editingBuilding?.name}
                value={this.state.form.newName}
                onChangeText={(text) =>
                  this.setState({ form: { ...this.state.form, newName: text } })
                }
              />

              <TextInput
                style={styles.input}
                placeholder={this.state.editingBuilding?.address}
                value={this.state.form.newAddress}
                onChangeText={(text) =>
                  this.setState({
                    form: { ...this.state.form, newAddress: text },
                  })
                }
              />

              <TextInput
                style={styles.input}
                placeholder={this.state.editingBuilding?.description}
                value={this.state.form.newDescription}
                onChangeText={(text) =>
                  this.setState({
                    form: { ...this.state.form, newDescription: text },
                  })
                }
              />

              <TextInput
                style={styles.input}
                placeholder="Date de début de construction"
                value={this.state.form.newStartBuild}
                onChangeText={(text) =>
                  this.setState({
                    form: { ...this.state.form, newStartBuild: text },
                  })
                }
              />

              <TextInput
                style={styles.input}
                placeholder="Date de fin de construction"
                value={this.state.form.newEndBuild}
                onChangeText={(text) =>
                  this.setState({
                    form: { ...this.state.form, newEndBuild: text },
                  })
                }
              />

              <Button title="Enregistrer" onPress={this.updateBuilding} />
              <Button title="Fermer" onPress={this.closeEditingModal} />
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
  },
  map: {
    flex: 1,
  },
  menuToggle: {
    position: "absolute",
    top: 5,
    alignSelf: "center",
    zIndex: 999,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 5,
    width: "50%",
  },
  menuToggleText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  menu: {
    position: "absolute",
    top: 60,
    alignSelf: "center",
    zIndex: 999,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 5,
    width: "50%",
  },
  menuItem: {
    color: "white",
    fontSize: 16,
    marginVertical: 5,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainerType: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(5, 0, 0, 0.5)",
    height: "max-content",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
  },
  modalContentType: {
    marginTop: "50%",
    padding: 20,
    borderRadius: 10,
    justifyContent: "space-between",
    alignContent: "center",
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  scrollView: {
    height: 20,
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
  buildingTypesContainer: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  buildingTypeButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedBuildingTypeButton: {
    backgroundColor: "blue",
  },
  buildingTypeButtonText: {
    color: "#000",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  picker: {
    height: 40,
    width: 80,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
});
