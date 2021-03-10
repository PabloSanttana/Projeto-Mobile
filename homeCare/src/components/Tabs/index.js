import React, {memo} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';

import styles from './styles';
import {textStatus} from '../../constants';

export const TabItem = (props) => {
  return <View style={[styles.tabitem]}>{props.children}</View>;
};

export const Status = (props) => {
  if (props.status === textStatus.baixo) {
    return <Text style={styles.bom}>{textStatus.baixo}</Text>;
  } else if (props.status === textStatus.moderada) {
    return <Text style={styles.alerta}>{textStatus.moderada}</Text>;
  } else {
    return <Text style={styles.critico}>{textStatus.severa}</Text>;
  }
};
function TabsContainer(props) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollview}>
        <TouchableOpacity
          style={[styles.touch]}
          onPress={() => props.onSaO2(props.labelSa)}>
          <TabItem>
            <Text style={styles.text}>SaO2</Text>
            <Text style={styles.info}>{props.SaO2}</Text>
            <Status status={props.SaOsStatus} />
          </TabItem>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touch}
          onPress={() => props.onBPM(props.labelBPM)}>
          <TabItem>
            <Text style={styles.text}>BPM</Text>
            <Text style={styles.info}>{props.BPM}</Text>
            <Status status={props.BPMStatus} />
          </TabItem>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touch}
          onPress={() => props.onPA(props.labelPA)}>
          <TabItem>
            <Text style={styles.text}>PA</Text>
            <Text style={styles.info}>{props.PA}</Text>
            <Status status={props.PAStatus} />
          </TabItem>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.touch}
          onPress={() => props.onRPM(props.labelRPM)}>
          <TabItem>
            <Text style={styles.text}>RPM</Text>
            <Text style={styles.info}>{props.RPM}</Text>
            <Status status={props.RPMStatus} />
          </TabItem>
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
}

export default memo(TabsContainer);
