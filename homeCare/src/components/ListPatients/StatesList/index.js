import React, {memo} from 'react';
import {View, Text} from 'react-native';

import {status} from '../../../constants';
import {textStatus} from '../../../constants';
import styles from './styles';

function StatesPaciente({label, statu}) {
  let color;
  if (statu === textStatus.severa) {
    color = status.critico;
  } else if (statu === textStatus.moderada) {
    color = status.alerta;
  } else {
    color = status.bom;
  }
  return (
    <View style={styles.status}>
      <Text style={styles.statusLabel}>
        {label}: {statu}
      </Text>
      <View style={[{backgroundColor: color}, styles.barraStatus]}></View>
    </View>
  );
}

export default memo(StatesPaciente);
