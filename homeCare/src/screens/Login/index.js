import React, {useCallback, useState} from 'react';
import {Text, Image, View, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import styles from './styles';
import {colors} from '../../constants';
import logo from '../../assets/logo.png';
import InputComponent from '../../components/InputComponent';
import api from '../../services/api';
import {login} from '../../store/modules/user/actions';
import AsyncStorage from '@react-native-community/async-storage';
import Button from '../../components/Button';

export default function Home() {
  const navigation = useNavigation();
  const [isSpinner, seTIsSpinner] = useState(false);
  const dispatch = useDispatch();
  const [CRM, setCRM] = useState('');
  const [value, setValue] = useState('');

  const cpfMask = useCallback((value) => {
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1'); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  }, []);

  const {profile} = useRoute().params;
  const inputInform = {
    label: profile === 'Paciente' ? 'CPF do Paciente' : 'Senha',
    placeholder:
      profile === 'Paciente' ? 'Digite CPF do Paciente' : 'Digite a Senha',
  };

  async function getFcmToken() {
    const token = await AsyncStorage.getItem('homecareFcmToken');
    /*  console.log('Tpken', token); */
    return token;
  }

  async function hanldeOnSubmit() {
    const fcmToken = await getFcmToken();
    if (profile === 'Paciente') {
      const data = {
        cpf: value.replace('.', '').replace('.', '').replace('-', ''),
        CRM,
        fcmToken,
      };
      console.log(data);
      seTIsSpinner(true);
      api
        .post('login/paciente', data)
        .then((response) => {
          /*  console.log(response.data); */
          const data = {
            ...response.data,
            type: 'paciente',
          };
          dispatch(login(data));
          seTIsSpinner(false);
          AsyncStorage.setItem('user', JSON.stringify(data));
          navigation.navigate('Entrar');
        })
        .catch((error) => {
          seTIsSpinner(false);
          alert('CRM ou CPF invalidos');
        });

      return;
    } else {
      const data = {
        CRM,
        password: value,
        fcmToken,
      };
      seTIsSpinner(true);
      api
        .post('login', data)
        .then((response) => {
          /* console.log(response.data); */
          const data = {
            ...response.data,
            type: 'medico',
          };
          dispatch(login(data));
          seTIsSpinner(false);
          AsyncStorage.setItem('user', JSON.stringify(data));
          navigation.navigate('Entrar');
        })
        .catch((error) => {
          seTIsSpinner(false);
          alert('CRM ou Password invalidos');
        });
    }
  }
  const handleSetValue = useCallback((e) => {
    if (profile === 'Paciente') {
      setValue(cpfMask(e));
    } else {
      setValue(e);
    }
  }, []);

  return (
    <LinearGradient
      style={{flex: 1}}
      colors={[colors.backgroundColorPrimary, colors.backgroundColorSecondary]}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}>
      <ScrollView style={styles.containerScrolview}>
        <View style={[styles.container, {paddingVertical: 40}]}>
          <Image style={styles.logo} source={logo} resizeMode="center" />
          <Text style={styles.title}>Login</Text>
          <Text style={[styles.title, {marginTop: -20}]}>
            Módulo {profile === 'Paciente' ? 'Cuidador' : 'Neurologista'}
          </Text>
          <Spinner
            visible={isSpinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
          <InputComponent
            label="CRM do Neurologista"
            placeholder="Digite o CRM..."
            value={CRM}
            setValue={setCRM}
            keyboardType="number-pad"
            length={7}
          />
          <InputComponent
            label={inputInform.label}
            placeholder={inputInform.placeholder}
            value={value}
            setValue={handleSetValue}
            secret={profile === 'Paciente' ? false : true}
            keyboardType={profile === 'Paciente' ? 'number-pad' : 'default'}
          />
          <Button title="Entrar" onpress={hanldeOnSubmit} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
