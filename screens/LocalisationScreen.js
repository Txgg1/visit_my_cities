import React, {Component} from "react";
import {View, StyleSheet, Button, TouchableOpacity, Text} from "react-native";
import * as Location from 'expo-location';
import MapView, {Marker} from "react-native-maps";

export default class LocalisationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null,
            errMessage: null,
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            showMenu: false, // Ajouter un état pour contrôler l'affichage du menu
        };
        this.onRegionChange = this.onRegionChange.bind(this);
    }

    componentDidMount() {
        this.useEffect();
    }

    async useEffect() {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            this.setState({errMessage: 'Permission denied'});
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        this.setState({location: location});
        console.log(location);
    }

    onRegionChange() {
        this.setState({
            region: {
                latitude: this.state.location?.coords?.latitude || 37.78825,
                longitude: this.state.location?.coords?.longitude || -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
        })
    }

    renderMenu() {
        if (this.state.showMenu) {
            return (
                <View style={styles.menu}>
                    <TouchableOpacity onPress={() => console.log('Ajouter')}>
                        <Text style={styles.menuItem}>Ajouter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log('Effacer')}>
                        <Text style={styles.menuItem}>Effacer</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return null;
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.menuToggle}
                    onPress={() => this.setState({showMenu: !this.state.showMenu})}
                >
                    <Text style={styles.menuToggleText}>{this.state.showMenu ? 'Fermer' : 'Menu'}</Text>
                </TouchableOpacity>
                {this.renderMenu()}
                <MapView
                    style={styles.map}
                    region={this.state.region}
                    onRegionChange={this.onRegionChange}
                >
                    <Marker
                        key={1}
                        coordinate={this.state.location?.coords || {latitude: 37.78825, longitude: -122.4324}}
                        title="Ma géoloc"
                    />
                </MapView>
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
        textAlign:"center"
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
});
