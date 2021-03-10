import React, {memo} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../constants';

import styles from './styles';

function index({item, cpf, CRM, type}) {
  let position;
  if (type === 'paciente' && item.from === cpf) {
    position = 'flex-end';
  } else if (type === 'medico' && item.from === CRM) {
    position = 'flex-end';
  } else {
    position = 'flex-start';
  }

  return (
    <View style={[styles.container]}>
      <View
        style={[
          {alignSelf: position},
          position === 'flex-start' ? styles.left : styles.right,
        ]}>
        <Icon
          style={[
            position === 'flex-start' ? styles.leftIcon : styles.rightIcon,
          ]}
          name="network-strength-4"
          color={
            position === 'flex-start' ? 'gray' : colors.backgroundColorSecondary
          }
          size={15}
        />
        <Text
          style={[
            position === 'flex-start' ? styles.leftText : styles.rightText,
          ]}>
          {item.message}
        </Text>
      </View>
    </View>
  );
}

export default memo(index);
