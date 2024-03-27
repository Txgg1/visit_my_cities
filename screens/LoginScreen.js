import React from "react";
import { Alert, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import Header from "../Components/Header";
import InputText from "../Components/InputText";
import { connect } from "react-redux";
import ButtonCustom from "../Components/ButtonCustom";
import PasswordInput from "../Components/PasswordInput"; // Importer le composant PasswordInput

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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

  // Fonction appelée lorsque le bouton de connexion est pressé
  onLoginPressed() {
    const { email, password } = this.state;

    // Vérification que les champs e-mail et mot de passe sont remplis
    if (!email || !password) {
      this.alerte();
      return;
    }

    // Requête GET pour récupérer les utilisateurs depuis l'API
    fetch("http://10.31.251.154:8080/users")
      .then((response) => {
        // Vérification de la réponse du serveur
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Conversion de la réponse en JSON
        return response.json();
      })
      .then((data) => {
        // Vérification de l'utilisateur dans les données récupérées
        const foundUser = data.find(
          (user) => user.mail === email && user.password === password
        );
        if (foundUser) {
          const action = { type: "SET_USER", value: foundUser };
          this.props.dispatch(action);
          // Redirection vers le tableau de bord avec le nom de l'utilisateur trouvé
          this.props.navigation.navigate("Dashboard", { isLoggedIn: true });
        } else {
          // Affichage d'un message d'erreur si l'utilisateur n'est pas trouvé
          Alert.alert("Erreur", "L'e-mail ou le mot de passe est incorrect");
        }
      })
      .catch((error) => {
        // Gestion des erreurs lors de la récupération des utilisateurs
        console.error(
          "Erreur lors de la récupération des utilisateurs:",
          error
        );
        Alert.alert("Erreur", "Une erreur est survenue lors de la connexion");
      });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <Header title="Connexion" />

        {/* Champ de saisie pour l'e-mail */}
        <InputText
          placeholder="E-mail"
          value={this.state.email}
          onChangeText={(text) => this.setState({ email: text })}
          label="Email"
          returnKeyType="next"
          secureTextEntry={false}
        />
        <View style={styles.view}></View>

        {/* Champ de saisie pour le mot de passe */}
        <PasswordInput
          placeholder="Mot de passe"
          label="Password"
          returnKeyType="done"
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text })}
          secureTextEntry={true}
        />
        <View style={styles.view}></View>

        {/* Bouton de connexion */}
        <ButtonCustom
          onPress={() => this.onLoginPressed()}
          style={styles.button}
          title="Connexion"
        />
        <View style={styles.row}>
          {/* Bouton pour aller à la page d'inscription */}
          <TouchableOpacity onPress={() => navigate("Registerscreen")}>
            <Text style={styles.link}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          {/* Bouton pour réinitialiser le mot de passe */}
          <TouchableOpacity onPress={() => navigate("ForgotPasswordscreen")}>
            <Text style={styles.link}>Mot de passe oublié</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
    justifyContent: "center",
  },
  link: {
    fontWeight: "bold",
    color: "#600EE6",
  },
  view: {
    height: 40,
  },
});

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(LoginScreen);
