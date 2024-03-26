import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";

const ProfileScreen = ({ user }) => {
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");

  const handleSave = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);

    fetch("http://jdevalik.fr/api/s_sitki/userinfo.php", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          Alert.alert(
            "Sauvegarde réussie",
            "Vos informations ont été mises à jour avec succès."
          );
        } else {
          Alert.alert(
            "Erreur",
            "Une erreur s'est produite lors de la sauvegarde."
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View>
      <Text>
        Bienvenue {route.params.username} sur notre application d'inscription
        connexion
      </Text>
      <Text>Nom :</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Text>Email :</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button title="Valider" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.users[0],
  };
};

export default connect(mapStateToProps)(ProfileScreen);
