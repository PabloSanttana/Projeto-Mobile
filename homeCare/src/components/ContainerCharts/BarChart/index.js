import React from 'react';
import {StackedBarChart, Grid, YAxis} from 'react-native-svg-charts';
import {View, Text} from 'react-native';

import {status} from '../../../constants';
import styles from './styles';

export default function index({state, data}) {
  /* console.log(data); */
  const label = [0, 20, 40, 60, 80, 100, 120, 150];

  const colors = [
    status.bom,
    status.alerta,
    status.critico,
    'rgba(255,255,255,0)',
  ];
  const keys = ['Bom', 'Alerta', 'Crítico', 'transparte'];
  const contentInset = {top: 20, bottom: 20};

  const newData = [
    {month: 1, Bom: 0, Alerta: 0, Crítico: 0, transparte: 0},
    ...data,
    {month: 1, Bom: 0, Alerta: 0, Crítico: 0, transparte: 140},
  ];

  return (
    <View>
      <Text style={styles.text}>Gráfico PA x Sinal</Text>
      <View style={styles.container}>
        <YAxis
          data={label}
          contentInset={contentInset}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          numberOfTicks={label.length}
          formatLabel={(value) => `${value} PA`}
        />
        <StackedBarChart
          style={styles.lineChart}
          keys={keys}
          colors={colors}
          data={newData}
          showGrid={false}
          contentInset={{top: 30, bottom: 20}}>
          <Grid />
        </StackedBarChart>
      </View>
      <Text style={styles.text}>Classificação de risco: {state}</Text>
    </View>
  );
}
