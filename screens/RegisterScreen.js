import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Header from "../Components/Header";
import { connect } from "react-redux";
import InputText from "../Components/InputText";
import ButtonCustom from "../Components/ButtonCustom";
import PasswordInput from "../Components/PasswordInput";
import local from "../Components/ipconfig";



class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: null,
      name: null,
      email: null,
      password: null,
      confirmPassword: null, // Ajouter un état pour le mot de passe de confirmation
    };
  }

  // Fonction d'alerte utilisée pour afficher des messages d'erreur
  alerte() {
    Alert.alert(
      "Erreur",
      "Veuillez remplir correctement les champs",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }

  // Fonction appelée lorsque le bouton d'inscription est pressé
  onSignUpPressed = async () => {
    const { name, email, password, confirmPassword } = this.state;

    // Vérification que tous les champs sont remplis
    if (!email || !password || !confirmPassword) {
      this.alerte();
      return;
    }

    // Vérification que les mots de passe correspondent
    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await fetch(local + "/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          firstname: "", 
          mail: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        Alert.alert("Erreur", errorMessage);
        return;
      }

      const userData = await response.json();
      this.props.navigation.navigate("Dashboard", { username: userData.name });
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Une erreur est survenue lors de l'inscription");
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Header title="Inscription" />
        <InputText
          placeholder='Prénom'
          label="Prénom"
          returnKeyType="next"
          value={this.state.firstname}
          onChangeText={(text) => this.setState({ firstname: text })}
          secureTextEntry={false}
        />
        <View style={styles.view}></View>
        <InputText
          placeholder='Nom'
          label="Nom"
          returnKeyType="next"
          value={this.state.name}
          onChangeText={(text) => this.setState({ name: text })}
          secureTextEntry={false}
        />
        <View style={styles.view}></View>
        <InputText
          placeholder='E-mail'
          label="E-mail"
          secureTextEntry={false}
          returnKeyType="next"
          value={this.state.email}
          onChangeText={(text) => this.setState({ email: text })}
        />
        <View style={styles.view}></View>
        <PasswordInput
          placeholder='Mot de passe'
          label="Mot de passe"
          returnKeyType="next"
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text })}
        />
        <View style={styles.view}></View>
        <PasswordInput
          placeholder='Confirmer le mot de passe'
          label="Confirmer le mot de passe"
          returnKeyType="done"
          value={this.state.confirmPassword}
          onChangeText={(text) => this.setState({ confirmPassword: text })}
        />
        <View style={styles.view}></View>
        <ButtonCustom
          onPress={() => this.onSignUpPressed()}
          title="Inscription"
          style={styles.button}
        />
        <View style={styles.row}>
          <Text style={styles.label}>Déjà inscrit ? </Text>
          <TouchableOpacity onPress={() => navigate("Loginscreen")}>
            <Text style={styles.link}>Connectez-vous</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    color: "#600EE6",
  },
  button: {
    marginTop: 24,
  },
  row: {
    alignSelf: "center",
    textAlign : "center",
    flexDirection: "row",
    marginTop: 40,
  },
  link: {
    fontWeight: "bold",
    color: "#600EE6",
  },
  input: {
    backgroundColor: "#ffffff",
  },
  view: {
    height: 40,
  },
});

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(RegisterScreen);
