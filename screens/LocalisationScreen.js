import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Modal, TextInput, Button } from "react-native";
import * as Location from 'expo-location';
import MapView, { Marker } from "react-native-maps";

export default class LocalisationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null, // Emplacement actuel de l'utilisateur
            errMessage: null, // Message d'erreur en cas de problème avec la localisation
            region: { // Région par défaut affichée sur la carte
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
        };
        this.onRegionChange = this.onRegionChange.bind(this);
        this.handleRemoveMarker = this.handleRemoveMarker.bind(this); // Binder la méthode handleRemoveMarker
    }

    componentDidMount() {
        this.useEffect();
        this.fetchBuildings(); // Appeler la méthode fetchBuildings lorsque le composant est monté
    }

    async useEffect() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            this.setState({ errMessage: 'Permission denied' }); // Mettre à jour le message d'erreur si la permission est refusée
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

    handleAddMarker = () => {
        if (!this.state.isAddingMarker) {
            this.setState({ isAddingMarker: true }); // Activer le mode d'ajout de marqueur
        }
    };

    handleMapPress = (e) => {
        if (this.state.isAddingMarker) {
            this.setState({ modalVisible: true });
            // Stocker temporairement les coordonnées du marqueur pour une utilisation ultérieure
            this.tempMarkerCoordinate = e.nativeEvent.coordinate;
        }
    };

    handleConfirmMarker = () => {
        const newMarkers = [...this.state.markers];
        newMarkers.push({
            coordinate: this.tempMarkerCoordinate,
            title: this.state.markerName || `Marqueur ${newMarkers.length + 1}` // Utiliser le nom du marqueur saisi ou un nom par défaut
        });
        this.setState({ markers: newMarkers, modalVisible: false, markerName: "" });
    };

    handleMarkerPress = (marker) => {
        this.setState({ selectedMarker: marker });
    };

    handleRemoveMarker = () => {
        const { markers, selectedMarker } = this.state;
        const filteredMarkers = markers.filter(marker => marker !== selectedMarker);
        this.setState({ markers: filteredMarkers, selectedMarker: null }); // Supprimer le marqueur sélectionné de la liste
    };

    async fetchBuildings() {
        try {
            const response = await fetch('http://192.168.56.1:8080/buildings'); // Récupérer les bâtiments depuis le backend
            if (!response.ok) {
                throw new Error('Failed to fetch buildings');
            }
            const buildings = await response.json();
            this.setState({ buildings }); // Mettre à jour la liste des bâtiments récupérés
        } catch (error) {
            console.error('Error fetching buildings:', error); // Gérer les erreurs lors de la récupération des bâtiments
        }
    }

    render() {
        return (
            <View style={styles.container}>
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
                        <View style={styles.modalContent}>
                            <Text>Nom du marqueur :</Text>
                            <TextInput
                                style={styles.input}
                                value={this.state.markerName}
                                onChangeText={(text) => this.setState({ markerName: text })}
                            />
                            <Button title="Confirmer" onPress={this.handleConfirmMarker} />
                        </View>
                    </View>
                </Modal>

                {/* Bouton pour ouvrir/fermer le menu */}
                <TouchableOpacity
                    style={styles.menuToggle}
                    onPress={() => this.setState({ showMenu: !this.state.showMenu })}
                >
                    <Text style={styles.menuToggleText}>{this.state.showMenu ? 'Fermer' : 'Menu'}</Text>
                </TouchableOpacity>
                {this.state.showMenu && (
                    <View style={styles.menu}>
                        {/* Bouton pour ajouter un marqueur */}
                        <TouchableOpacity onPress={this.handleAddMarker}>
                            <Text style={styles.menuItem}>Ajouter</Text>
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
                    {this.state.buildings.map((building, index) => (
                        <Marker
                            key={index}
                            coordinate={{ latitude: building.latitude, longitude: building.longitude }}
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
                            <Text>Nom du bâtiment: {this.state.selectedMarker?.name}</Text>
                            <Text>Adresse: {this.state.selectedMarker?.address}</Text>
                            <Text>Description: {this.state.selectedMarker?.description}</Text>
                            <Text>Date de début de construction: {this.state.selectedMarker?.startBuild}</Text>
                            <Text>Date de fin de construction: {this.state.selectedMarker?.endBuild}</Text>
                            <Text>Latitude: {this.state.selectedMarker?.latitude}</Text>
                            <Text>Longitude: {this.state.selectedMarker?.longitude}</Text>
                            <Button title="Supprimer" onPress={this.handleRemoveMarker} />
                        </View>
                    </View>
                </Modal>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    menuToggle: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 999,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: 5,
        width: 80,
    },
    menuToggleText: {
        color: 'white',
        fontSize: 16,
        textAlign: "center"
    },
    menu: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 999,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: 5,
        width: 80
    },
    menuItem: {
        color: 'white',
        fontSize: 16,
        marginVertical: 5,
        textAlign: "center"
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        height:"50%",
        width:"60%",
        justifyContent:"space-between"
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});
