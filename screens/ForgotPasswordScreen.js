import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Alert, TextInput, Button, View } from 'react-native';
import { emailValidator, passwordValidator } from '../core/utils';
import Header from '../Components/Header';
import { Theme } from '../core/theme';

export default class ForgotPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      newPassword: ""
    };
  }

  alert() {
    Alert.alert(
      'Erreur',
      'Email ou mot de passe incorrect',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  onUpdatePressed() {
    const { email, newPassword } = this.state;

    if (!email || !newPassword) {
      this.alert();
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("newPassword", newPassword);

    fetch('http://192.168.56.1:8080/users/updatePassword', {
      method: 'PATCH',
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
    })
    .then((response) => response.json())
    .then((json) => {
      if (json === false) {
        Alert.alert('Erreur', 'L\'e-mail saisi n\'existe pas');
      } else {
        this.props.navigation.navigate('Loginscreen');
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
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <View style={styles.view}></View>

        <TextInput
          label="New password"
          returnKeyType="done"
          value={this.state.newPassword}
          onChangeText={(text) => this.setState({ newPassword: text })}
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
        />
        <View style={styles.view}></View>

        <Button onPress={() => this.onUpdatePressed()} style={styles.button} title="Valider" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  back: {
    width: '100%',
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
  label: {
    color: Theme.colors.secondary,
    width: '100%',
  },
  input: {
    backgroundColor: "#ffffff",
  },
  view: {
    height: 40
  }
});
