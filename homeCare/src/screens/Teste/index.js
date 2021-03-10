import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ProgressCircle} from 'react-native-svg-charts';
import {useApiSWR} from '../../Utils/userApiSWR';

export default function index() {
  const {data} = useApiSWR('/notificacao/paciente');
  console.log(data);
  return (
    <SafeAreaView>
      <ProgressCircle
        style={{height: 200}}
        progress={0.7}
        progressColor={'rgb(134, 65, 244)'}
      />
    </SafeAreaView>
  );
}
