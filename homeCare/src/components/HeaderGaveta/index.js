import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';

import styles from './styles';

export default function index({title}) {
  return (
    <View style={styles.container}>
      <Icon name="list-bullet" size={30} color="#fff" />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
