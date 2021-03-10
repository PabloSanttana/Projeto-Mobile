import React, {memo} from 'react';
import {View, Text, TextInput} from 'react-native';

import styles from './styles';

function index({
  label,
  placeholder,
  value,
  setValue,
  secret = false,
  keyboardType = 'default',
  length = 20,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#fff"
        value={value}
        onChangeText={setValue}
        secureTextEntry={secret}
        keyboardType={keyboardType}
        maxLength={length}
      />
    </View>
  );
}
export default memo(index);
