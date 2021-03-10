import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';

export default function index({onpress, title, color}) {
  return (
    <TouchableOpacity
      onPress={onpress}
      style={[styles.containerButton, color && styles.containerButtonColor]}>
      <Text style={[styles.buttonTitle, color && styles.buttonTitleColor]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
