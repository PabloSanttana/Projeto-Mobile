import React, {memo, useCallback} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import styles from './styles';
import Logo from '../../assets/logo.png';
import MaskCPF from '../../Utils/maskCPF';

function index({item, navigate}) {
  const handleNavigateToDetail = useCallback(() => {
    const data = {
      ...item,
    };
    navigate(data);
  }, [item]);

  return (
    <TouchableOpacity
      style={styles.superContainer}
      onPress={handleNavigateToDetail}>
      <View style={styles.container}>
        <Image source={Logo} style={styles.avatar} />
        <View style={styles.nameContainer}>
          <Text numberOfLines={1} style={styles.name}>
            {item.name}
          </Text>
          <Text numberOfLines={1} style={styles.message}>
            CPF: <MaskCPF value={item.cpf} />
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default memo(index);
