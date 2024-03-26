import React from "react";
import Header from "../Components/Header";
import { View, StyleSheet, Text } from "react-native";
import ButtonCustom from "../Components/ButtonCustom";

export default class HomeScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View>
          <Header title="Visit My Cities" />
        </View>

        <View style={styles.containerChildren}>
          <ButtonCustom
            onPress={() => navigate("Loginscreen")}
            title="Connexion"
          >
            <Text style={styles.button}>Connexion</Text>
          </ButtonCustom>
          <ButtonCustom
            s
            onPress={() => navigate("Registerscreen")}
            title="Inscription"
          >
            <Text style={styles.button}>Inscription</Text>
          </ButtonCustom>
        </View>
        <View>
          <ButtonCustom onPress={() => navigate("Localisation")} title="MAP">
            <Text>MAP</Text>
          </ButtonCustom>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  containerChildren: {
    height: "10%",
    justifyContent: "space-between",
  },
});
