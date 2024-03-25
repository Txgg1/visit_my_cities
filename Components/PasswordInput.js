import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, Alert, TextInput, Button, View } from 'react-native';
import { Theme } from '../core/theme';

const PasswordInput = ({ label, value, onChangeText }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View>
      <TextInput
        label={label}
        returnKeyType="done"
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>{showPassword ? 'Cacher' : 'Afficher'} le Mot de passe</Text>
      </TouchableOpacity>
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
  toggleButton: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  toggleButtonText: {
    color: Theme.colors.primary,
    textDecorationLine: 'underline',
  },
});

export default PasswordInput;
