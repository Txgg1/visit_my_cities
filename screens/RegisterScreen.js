import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Header from '../Components/Header';
import { emailValidator, passwordValidator, nameValidator } from '../core/utils';
import { connect } from 'react-redux';
import InputText from "../Components/InputText";
import ButtonCustom from '../Components/ButtonCustom';

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

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

  onSignUpPressed() {
    const { name, email, password } = this.state;

    if (!name || !email || !password) {
      this.alerte();
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("mail", email);
    formData.append("password", password);

    fetch('http://jdevalik.fr/api/s_sitki/insertuser.php', {
      method: 'POST',
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      },
    })
    .then((response) => response.json())
    .then((json) => {
      if (json === false) {
        Alert.alert('Erreur', 'L\'e-mail saisi existe déjà. Veuillez saisir une autre adresse mail ou récupérer votre mot de passe');
      } else {
        this.props.navigation.navigate('Dashboard', { username: name });
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Header title="Inscription" />
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
