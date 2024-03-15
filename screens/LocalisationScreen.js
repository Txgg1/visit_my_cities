import React, {Component} from "react";
import { View, StyleSheet} from "react-native";
import * as Location from 'expo-location';
import MapView from "react-native-maps";
import {Marker} from 'react-native-maps';

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

        };
        this.onRegionChange = this.onRegionChange.bind(this);
    }

    componentDidMount() {
        this.useEffect();
    }

    componentWillUnmount() {
    }

    async useEffect() {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            this.setState({errMessage: 'Permission denied'});
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        this.setState({location:location});
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

    render() {

        return (
            <MapView
                style={styles.camera}
                region={this.state.region}
                onRegionChange={this.onRegionChange}
            >
                <Marker
                    key={1}
                    coordinate={this.state.location?.coords || {
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    title="Ma géoloc"
                />

            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    buttonSnap: {
        marginTop: 20,
        flex: 0.3,
        alignSelf: 'flex-start',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});

