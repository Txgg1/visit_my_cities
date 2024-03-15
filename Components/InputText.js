import React from 'react';
import { TextInput, View } from 'react-native';

class InputText extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { value, onChangeText, returnKeyType, secureTextEntry, label, placeholder } = this.props;

    return (
      <View>
        <TextInput
          placeholder={placeholder}
          label={label}
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, textAlign: 'center' }}
          value={value}
          onChangeText={onChangeText}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
        />
      </View>
    );
  }
}

export default InputText;
