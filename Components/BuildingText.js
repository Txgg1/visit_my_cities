import React from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';

const BuildingDetailsText = ({ title, value }) => {
  return (
    <Text style={styles.title}>
      <Text style={styles.bold}>{title}: </Text>
      {value}
    </Text>
  );
};

const BuildingDetailsScrollView = ({ title, value }) => {
  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true}>
      <BuildingDetailsText title={title} value={value} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
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
