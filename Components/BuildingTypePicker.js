import React, { Component } from 'react';
import { View, StyleSheet, Picker } from 'react-native';

export default class BuildingTypePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: null,
    };
  }

  render() {
    const { selectedType } = this.state;
    const { buildingTypes } = this.props;

    return (
      <View style={styles.container}>
        <Picker
          selectedValue={selectedType}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ selectedType: itemValue })
          }
        >
          <Picker.Item label="Sélectionner un type de bâtiment" value={null} />
          {buildingTypes.map((type) => (
            <Picker.Item key={type.id} label={type.label} value={type.id} />
          ))}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    height: "50%",
  },
});