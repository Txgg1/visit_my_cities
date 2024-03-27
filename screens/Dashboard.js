import React from "react";
import { View, Text, Button } from "react-native";
import Header from "../Components/Header";
import Paragraph from "../Components/Paragraph";
import ButtonCustom from "../Components/ButtonCustom";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";

class Dashboard extends React.Component {
  static options() {
    return {
      topBar: {
        leftButtons: {
          id: "sideMenu",
          icon: require("../assets/menuIcon.png"),
        },
      },
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { navigation, route } = this.props;
    // console.log(route.params

    return (
      <View>
        <Header title="Vous êtes connecté" />
        <Paragraph>
          Bienvenue {(this.props.user.firstname == null) ? this.props.user.mail : this.props.user.firstname} sur notre application
        </Paragraph>
        <Button
        title="Mon Profil"
          onPress={() => navigation.navigate('Profile')}
        />
        {/* <Button title="Camera" onPress={() => navigation.navigate("Camera")} /> */}
        <Button
          title="Carte"
          onPress={() => navigation.navigate("Localisation")}
        />
        <Button
          title="Mes Bâtiments Favoris"
          onPress={() => navigation.navigate("FavoriteBuildings")}
        />
        {/* <Button title="Menu"
                        onPress={() => navigation.navigate('MenuBurger')}
                /> */}
        <ButtonCustom
          onPress={() => navigation.navigate("Homescreen")}
          title="Déconnexion"
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Dashboard);
