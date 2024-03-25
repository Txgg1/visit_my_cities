import React from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';

const BuildingDetailsText = ({ label, value }) => {
  return (
    <Text style={styles.label}>
      <Text style={styles.bold}>{label}: </Text>
      {value}
    </Text>
  );
};

const BuildingDetailsScrollView = ({ label, value }) => {
  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true}>
      <BuildingDetailsText label={label} value={value} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  scrollView: {
    maxHeight: "30%",
    borderBottomWidth: 1,
    marginBottom: 8,
  },
});

export { BuildingDetailsText, BuildingDetailsScrollView };
