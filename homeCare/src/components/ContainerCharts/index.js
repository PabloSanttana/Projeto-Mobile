import React, {memo} from 'react';
import {View, Text} from 'react-native';

import {colors, status} from '../../constants';
import styles from './styles';
import ProgressCircle from './ProgressCircle';
import LineChart from './LineChart';
import BarChart from './BarChart';

function index({type, value, color, state, data}) {
  const ContainerGharts = () => {
    if (type === 'SaO2') {
      return <ProgressCircle value={value} color={color} state={state} />;
    } else if (type === 'BPM') {
      return (
        <LineChart value={value} color={color} state={state} data={data} />
      );
    } else if (type === 'PA') {
      return <BarChart value={value} color={color} state={state} data={data} />;
    }
  };

  return <View style={styles.container}>{ContainerGharts()}</View>;
}

export default memo(index);
