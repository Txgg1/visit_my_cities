import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';

const UpdateProfileScreen = ({ route }) => {
  const { name, email } = route.params;
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [newPassword, setNewPassword] = useState('');

  const handleUpdate = () => {

    fetch('http://jdevalik.fr/api/s_sitki/updateuser.php', {
      method: 'POST',
      body: JSON.stringify({ name: newName, email: newEmail, password: newPassword }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          Alert.alert('Mise à jour réussie', 'Vos informations ont été mises à jour avec succès.');
        } else {
          Alert.alert('Erreur', 'Une erreur s\'est produite lors de la mise à jour.');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View>
      <Text>Nom actuel :</Text>
      <Text>{name}</Text>
      <Text>Nouveau nom :</Text>
      <TextInput
        style={styles.input}
        value={newName}
        onChangeText={(text) => setNewName(text)}
      />
      <Text>Email actuel :</Text>
      <Text>{email}</Text>
      <Text>Nouvel email :</Text>
      <TextInput
        style={styles.input}
        value={newEmail}
        onChangeText={(text) => setNewEmail(text)}
      />
      <Text>Nouveau mot de passe :</Text>
      <TextInput
        style={styles.input}
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
        secureTextEntry
      />
      <Button title="Valider" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
  },
});

export default connect()(UpdateProfileScreen);
