import React, {memo, useCallback, useMemo} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import styles from './styles';
import Logo from '../../assets/logo.png';
import StatesList from './StatesList';

function index({item, navigate}) {
  const handleNavigateToDetail = useCallback(() => {
    const statuBPM = {
      valor: item.BPM.valor,
      statu: item.BPM.status,
    };
    const statuSaO2 = {
      valor: item.SaO2.valor,
      statu: item.SaO2.status,
    };
    const statuPA = {
      valor: item.PA.valor,
      statu: item.PA.status,
    };
    const data = {
      ...item,
      statuBPM,
      statuSaO2,
      statuPA,
    };
    navigate(data);
  }, [item]);

  const SortStatus = useCallback((BPM, PA, SaO2) => {
    let sortt = [`${BPM} BPM`, `${PA} PA`, `${SaO2} SaO2`];
    let sortreverse = sortt.sort().reverse();
    return (
      <>
        {sortreverse.map((item, index) => (
          <StatesList
            key={index}
            label={item.split(' ')[1]}
            statu={item.split(' ')[0]}
          />
        ))}
      </>
    );
  }, []);

  const cpfMask = useCallback((value) => {
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1'); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }, []);

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
            CPF: {cpfMask(item.cpf)}
          </Text>
        </View>
      </View>
      <View style={styles.containerStatus}>
        {SortStatus(item.BPM.status, item.PA.status, item.SaO2.status)}
      </View>
    </TouchableOpacity>
  );
}

export default memo(index);
