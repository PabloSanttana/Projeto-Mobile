import React, {useCallback, memo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import styles from './styles';
import {colors, status, textStatus} from '../../constants';
import ContainerCharts from '../ContainerCharts';

function index({label, title, value, name, state, historic, isModal}) {
  const StatusColor = useCallback(() => {
    let colorBarra;
    if (state === textStatus.severa) {
      colorBarra = status.critico;
    } else if (state === textStatus.moderada) {
      colorBarra = status.alerta;
    } else if (state === textStatus.baixo) {
      colorBarra = status.bom;
    }
    return colorBarra;
  });

  const configModal = useCallback((title) => {
    isModal(title);
  }, []);

  const Title = useCallback((value) => {
    if (value === 'BPM' || value === 'PA') {
      return true;
    } else {
      return false;
    }
  });

  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerLabel}>
          <TouchableOpacity onPress={() => configModal('info')}>
            <Entypo
              name="info-with-circle"
              size={25}
              color={colors.backgroundColorButton}
            />
          </TouchableOpacity>
          <Text style={styles.label}>{label}</Text>
          <TouchableOpacity onPress={() => configModal('intervencoes')}>
            <Entypo
              name="dots-three-vertical"
              size={25}
              color={colors.backgroundColorButton}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.containerCenter}>
          <Text style={styles.title}>
            {title}
            {': '}
            {Title(title) && (
              <Text style={{color: colors.textColorPrimary}}>{value} </Text>
            )}
          </Text>
          <ContainerCharts
            value={value}
            type={title}
            color={StatusColor()}
            state={state}
            data={historic}
          />
        </View>
        <Text numberOfLines={1} style={styles.name}>
          {name}
        </Text>
      </View>
    </>
  );
}
export default memo(index);
