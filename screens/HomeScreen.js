import React from 'react';
import Header from '../Components/Header';
import { View, StyleSheet } from 'react-native';
import ButtonCustom from '../Components/ButtonCustom';



export default class HomeScreen extends React.Component {
  

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <Header title="HomePage" />
        <ButtonCustom
          onPress={() => navigate('Loginscreen')}
          title="Connexion"
        />
        <View style={styles.espace}></View>
        <ButtonCustom
          onPress={() => 
            navigate('Registerscreen')}
          title="Inscription"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  espace: {
    height: 20,
  },
});
