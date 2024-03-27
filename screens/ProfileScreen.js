import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: this.props.user.id,
        name: this.props.user.name,
        firstname: this.props.user.firstname,
        email: this.props.user.mail,
        password: this.props.user.password,
      },
      modalVisible: false,
      newName: null,
      newFirstname: null,
      newEmail: null,
      newPassword: null,
    };
  }

  handleSaveChanges = () => {
    // Envoyer les modifications au backend
    // Mettre à jour l'état de l'utilisateur avec les nouvelles informations
    const { newName, newFirstname, newEmail, newPassword, user } = this.state;
    const updatedUser = {
      id: user.id,
      name: newName || user.name,
      firstname: newFirstname || user.firstname,
      email: newEmail || user.email,
      password: newPassword || user.password,
    };

    fetch(`http://10.31.251.154:8080/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
    .then(response => response.json())
    .then(data => {
      // If the request was successful, update the user state
      this.setState({
        user: updatedUser,
        modalVisible: false,
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  render() {
    const { user, modalVisible } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Nom :</Text>
        <Text style={styles.text}>{user.name}</Text>
        <Text style={styles.label}>Prénom :</Text>
        <Text style={styles.text}>{user.firstname}</Text>
        <Text style={styles.label}>Email :</Text>
        <Text style={styles.text}>{user.email}</Text>
        {/* Ajoutez d'autres champs d'informations de l'utilisateur ici */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.setState({ modalVisible: true })}
        >
          <Text style={styles.buttonText}>Modifier les informations</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Modifier les informations</Text>
              <TextInput
                style={styles.input}
                placeholder="Nouveau nom"
                onChangeText={(text) => this.setState({ newName: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Nouveau prénom"
                onChangeText={(text) => this.setState({ newFirstname: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Nouvel email"
                onChangeText={(text) => this.setState({ newEmail: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Nouveau mot de passe"
                onChangeText={(text) => this.setState({ newPassword: text })}
              />
              <Button title="Enregistrer les modifications" onPress={this.handleSaveChanges} />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(ProfileScreen);
