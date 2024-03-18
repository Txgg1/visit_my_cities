import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Modal, TextInput, Button } from "react-native";
import * as Location from 'expo-location';
import MapView, { Marker } from "react-native-maps";

export default class LocalisationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null,
            errMessage: null,
            region: {
                latitude: 48.249564,
                longitude: 7.472165,
                latitudeDelta: 1.5,
                longitudeDelta: 1.5,
            },
            showMenu: false,
            isAddingMarker: false,
            markers: [],
            markerName: "", // Ajouter un état pour stocker le nom du marqueur
            modalVisible: false, // Ajouter un état pour contrôler la visibilité de la boîte de dialogue modale
            selectedMarker: null, // Ajouter un état pour le marqueur sélectionné
        };
        this.onRegionChange = this.onRegionChange.bind(this);
    }

    componentDidMount() {
        this.useEffect();
    }

    async useEffect() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            this.setState({ errMessage: 'Permission denied' });
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location: location });
    }

    onRegionChange() {
        this.setState({
            region: {
                // latitude: this.state.location?.coords?.latitude || 48.249564,
                // longitude: this.state.location?.coords?.longitude || 7.472165,
                latitudeDelta: 1.5,
                longitudeDelta: 1.5,
            },
        });
    }

    handleAddMarker = () => {
        if (!this.state.isAddingMarker) {
            this.setState({ isAddingMarker: true });
        }
    };

    handleMapPress = (e) => {
        if (this.state.isAddingMarker) {
            this.setState({ modalVisible: true });
            // Stocker les coordonnées du marqueur temporairement pour pouvoir les utiliser lorsque l'utilisateur confirme le nom
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
        this.setState({ markers: filteredMarkers, selectedMarker: null });
    };

    render() {
        return (
            <View style={styles.container}>
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

                <TouchableOpacity
                    style={styles.menuToggle}
                    onPress={() => this.setState({ showMenu: !this.state.showMenu })}
                >
                    <Text style={styles.menuToggleText}>{this.state.showMenu ? 'Fermer' : 'Menu'}</Text>
                </TouchableOpacity>
                {this.state.showMenu && (
                    <View style={styles.menu}>
                        <TouchableOpacity onPress={this.handleAddMarker}>
                            <Text style={styles.menuItem}>Ajouter</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <MapView
                    style={styles.map}
                    region={this.state.region}
                    onRegionChange={this.onRegionChange}
                    onPress={this.handleMapPress}
                >
                    {this.state.markers.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={marker.coordinate}
                            title={marker.title}
                            onPress={() => this.handleMarkerPress(marker)} // Mettre à jour le marqueur sélectionné
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
                            <Text>Nom du marqueur: {this.state.selectedMarker?.title}</Text>
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
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});
