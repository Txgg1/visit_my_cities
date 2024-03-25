import React from 'react';
import { View, Text, Button } from 'react-native';
import Header from '../Components/Header';
import Paragraph from '../Components/Paragraph';
import ButtonCustom from '../Components/ButtonCustom';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
// import { createDrawerNavigator } from '@react-navigation/drawer';

// const Drawer = createDrawerNavigator();

class Dashboard extends React.Component {
    static options() {
        return {
            topBar: {
                leftButtons: {
                    id: 'sideMenu',
                    icon: require('../assets/menuIcon.png')
                }
            }
        };
    }

    constructor(props) {
        super(props);
    }

    navigationButtonPressed({ buttonId }) {
        if (buttonId === 'sideMenu') {
            Navigation.mergeOptions(this.props.componentId, {
                sideMenu: {
                    left: {
                        visible: true
                    }
                }
            });
        }
    }

    render() {
        const { navigation, route } = this.props;

        return (
            <View>
                <Header title="Vous êtes connecté" />
                <Paragraph>
                    Bienvenue {route.params.username} sur notre application
                </Paragraph>
                {/*<Button*/}
                {/*    title="Mon Profil"*/}
                {/*    onPress={() => navigation.navigate('Profile')}*/}
                {/*/>*/}
                <Button title="Camera"
                        onPress={() => navigation.navigate('Camera')}
                />
                <Button title="Geoloc"
                        onPress={() => navigation.navigate('Localisation')}
                />
                {/* <Button title="Menu"
                        onPress={() => navigation.navigate('MenuBurger')}
                /> */}
                <ButtonCustom onPress={() => navigation.navigate('Homescreen')} title="Déconnexion" />
            </View>
        );
    }
}

export default connect()(Dashboard);
