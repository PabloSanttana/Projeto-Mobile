import React, {memo} from 'react';
import {LineChart, YAxis, Grid} from 'react-native-svg-charts';
import {View, Text} from 'react-native';

import styles from './styles';

function index({value, color, state, data}) {
  /*  const data = [60, 50, 100, 110, 80, 90, 100, 75, 69, 89, 50, 50, 50, 50, 80]; */

  const label = [50, 55, 60, 65, 70, 75, 80, 85];

  const contentInset = {top: 20, bottom: 20};
  return (
    <View>
      <Text style={styles.text}>Gráfico</Text>
      <View style={styles.container}>
        <YAxis
          data={label}
          contentInset={contentInset}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          numberOfTicks={label.length}
          formatLabel={(value) => `${value} BPM`}
        />

        <LineChart
          style={[styles.lineChart]}
          data={data.length === 0 ? [50, 85] : data}
          svg={{stroke: color}}
          shadowColor={color}
          contentInset={{top: 20, bottom: 20}}>
          <Grid />
        </LineChart>
      </View>
      <Text style={styles.text}> Classificação de risco: {state}</Text>
    </View>
  );
}

export default memo(index);
