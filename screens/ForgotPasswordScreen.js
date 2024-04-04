import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Button,
  View,
} from "react-native";
import { emailValidator, passwordValidator } from "../core/utils";
import Header from "../Components/Header";
import { Theme } from "../core/theme";
import PasswordInput from "../Components/PasswordInput"; // Importer le composant PasswordInput
import local from "../Components/ipconfig";


export default class ForgotPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      newPassword: "",
      confirmPassword: "",
    };
  }

  alert() {
    Alert.alert(
      "Erreur",
      "Email ou mot de passe incorrect",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }

  onUpdatePressed() {
    const { email, newPassword, confirmPassword } = this.state;

    if (!email || !newPassword || !confirmPassword) {
      this.alert();
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
      return;
    }

    const data = {
      email: email,
      password: newPassword,
    };

    fetch( local +`/users/mail/${email}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((user) => {
        if (!user) {
          Alert.alert("Erreur", "L'e-mail saisi n'existe pas");
        } else {
          fetch(local + `/users/${user.id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then(() => {
              this.props.navigation.navigate("Loginscreen");
            })
            .catch((error) => {
              console.error(error);
            });
        }
        {
          console.log(data);
        }
        {
          console.log(user);
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
        <Header>Reinitialiser son mot de passe</Header>

        <TextInput
          label="E-mail address"
          returnKeyType="next"
          value={this.state.email}
          onChangeText={(text) => this.setState({ email: text })}
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            margin: 10,
          }}
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <View style={styles.view}></View>

        <PasswordInput 
          label="New Password"
          value={this.state.newPassword}
          onChangeText={(text) => this.setState({ newPassword: text })}
        />

        <PasswordInput 
          label="Confirm new password"
          value={this.state.confirmPassword}
          onChangeText={(text) => this.setState({ confirmPassword: text })}
        />

        <Button
          onPress={() => this.onUpdatePressed()}
          style={styles.button}
          title="Valider"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  back: {
    width: "100%",
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
  label: {
    color: Theme.colors.secondary,
    width: "100%",
  },
  input: {
    backgroundColor: "#ffffff",
  },
  view: {
    height: 40,
  },
});
