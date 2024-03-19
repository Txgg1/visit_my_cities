import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Header from '../Components/Header';
import { connect } from 'react-redux';
import InputText from "../Components/InputText";
import ButtonCustom from '../Components/ButtonCustom';

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      name: "",
      email: "",
      password: "",
    };
  }

  // Fonction d'alerte utilisée pour afficher des messages d'erreur
  alerte() {
    Alert.alert(
        'Erreur',
        'Veuillez remplir correctement les champs',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
    );
  }

  // Fonction appelée lorsque le bouton d'inscription est pressé
  onSignUpPressed = async () => {
    const { name, email, password } = this.state;

    // Vérification que tous les champs sont remplis
    if (!name || !email || !password) {
      this.alerte();
      return;
    }

    try {
      const response = await fetch('http://192.168.56.1:8080/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          firstname: "", // Si votre backend nécessite un prénom, ajoutez-le ici
          mail: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        Alert.alert('Erreur', errorMessage);
        return;
      }

      const userData = await response.json();
      this.props.navigation.navigate('Dashboard', { username: userData.name });
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'inscription');
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
        <View>
          <Header title="Inscription" />
          <InputText
              label="Prénom"
              returnKeyType="next"
              value={this.state.firstname}
              onChangeText={(text) => this.setState({ firstname: text })}
              secureTextEntry={false}
          />
          <View style={styles.view}></View>
          <InputText
              label="Nom"
              returnKeyType="next"
              value={this.state.name}
              onChangeText={(text) => this.setState({ name: text })}
              secureTextEntry={false}
          />
          <View style={styles.view}></View>
          <InputText
              label="E-mail"
              secureTextEntry={false}
              returnKeyType="next"
              value={this.state.email}
              onChangeText={(text) => this.setState({ email: text })}
          />
          <View style={styles.view}></View>
          <InputText
              label="Mot de passe"
              returnKeyType="done"
              value={this.state.password}
              onChangeText={(text) => this.setState({ password: text })}
              secureTextEntry={true}
          />
          <View style={styles.view}></View>
          <ButtonCustom onPress={() => this.onSignUpPressed()} title="Inscription" style={styles.button} />
          <View style={styles.row}>
            <Text style={styles.label}>Déjà inscrit ? </Text>
            <TouchableOpacity onPress={() => navigate('Loginscreen')}>
              <Text style={styles.link}>Connectez-vous</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    color: '#600EE6',
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: '#600EE6',
  },
  input: {
    backgroundColor: "#ffffff",
  },
  view: {
    height: 40
  }
});

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(RegisterScreen);
