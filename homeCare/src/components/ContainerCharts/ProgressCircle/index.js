import React, {memo, useMemo} from 'react';
import {View, Text} from 'react-native';
import {ProgressCircle} from 'react-native-svg-charts';

import styles from './styles';

function index({value, color, state}) {
  // captuar só numero que esta na string
  const percentagem = useMemo(() => value.replace(/\D/gim, '') / 100);

  return (
    <>
      <View style={styles.container}>
        <ProgressCircle
          style={styles.progressCircle}
          progress={percentagem}
          progressColor={color}
          strokeWidth={20}
          startAngle={0}
          cornerRadius={4}
        />
        <View style={styles.infoContainerSaO2}>
          <Text style={styles.value}>{value}</Text>
        </View>
        <Text style={styles.status}> Classificação de risco: {state}</Text>
      </View>
    </>
  );
}

export default memo(index);
