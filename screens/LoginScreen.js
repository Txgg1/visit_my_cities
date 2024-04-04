import React from "react";
import { Alert, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import Header from "../Components/Header";
import InputText from "../Components/InputText";
import { connect } from "react-redux";
import ButtonCustom from "../Components/ButtonCustom";
import PasswordInput from "../Components/PasswordInput"; 
import local from "../Components/ipconfig";

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  alerte() {
    Alert.alert(
      "Erreur",
      "Veuillez remplir correctement les champs",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }

  onLoginPressed() {
    const { email, password } = this.state;

    if (!email || !password) {
      this.alerte();
      return;
    }

    fetch(local + "/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const foundUser = data.find(
          (user) => user.mail === email && user.password === password
        );
        if (foundUser) {
          const action = { type: "SET_USER", value: foundUser };
          this.props.dispatch(action);
          this.props.navigation.navigate("Dashboard", { isLoggedIn: true });
        } else {
          Alert.alert("Erreur", "L'e-mail ou le mot de passe est incorrect");
        }
      })
      .catch((error) => {
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

        <InputText
          placeholder="E-mail"
          value={this.state.email}
          onChangeText={(text) => this.setState({ email: text })}
          label="Email"
          returnKeyType="next"
          secureTextEntry={false}
        />
        <View style={styles.view}></View>

        <PasswordInput
          placeholder="Mot de passe"
          label="Password"
          returnKeyType="done"
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text })}
          secureTextEntry={true}
        />
        <View style={styles.view}></View>

        <ButtonCustom
          onPress={() => this.onLoginPressed()}
          style={styles.button}
          title="Connexion"
        />
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigate("Registerscreen")}>
            <Text style={styles.link}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
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
