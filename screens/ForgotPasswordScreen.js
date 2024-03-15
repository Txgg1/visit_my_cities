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
      newpassword: ""
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

  onSendPressed(state) {
    const { email, newpassword } = state;

    if (!email || !newpassword) {
      this.alert();
      return;
    }

    const formData = new FormData();
    formData.append("mail", email);
    formData.append("password", newpassword);

    fetch('http://jdevalik.fr/api/s_sitki/updateuser.php', {
      method: 'POST',
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data"
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
          value={this.state.newpassword}
          onChangeText={(text) => this.setState({ newpassword: text })}
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
        />
        <View style={styles.view}></View>

        <Button onPress={() => this.onSendPressed(this.state)} style={styles.button} title="Valider" />
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
