import React from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import styles from './styles';
import {logout} from '../../store/modules/user/actions';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

export default function index() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData);
  function handleLogout() {
    Alert.alert(
      'Deseja realmente sair?',
      'Aletar: ao sair o celualr não receberar notificações do aplicativo',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: () => logoutConfirm(),
        },
      ],
      {cancelable: false},
    );
  }

  async function logoutConfirm() {
    if (user.type === 'paciente') {
      logoutModulePaient();
    } else {
      logoutModuleDoctor();
    }
    dispatch(logout());
    AsyncStorage.removeItem('user');
    navigation.navigate('Home');
  }
  function logoutModulePaient() {
    const data = {
      cpf: user.cpf,
    };
    api
      .post('/logout/paciente', data)
      .then((response) => {
        console.log('logout sucess');
      })
      .catch((error) => {
        console.log('logout error', error);
      });
  }
  function logoutModuleDoctor() {
    const data = {
      CRM: user.CRM,
    };
    api
      .post('/logout/medico', data)
      .then((response) => {
        console.log('logout sucess');
      })
      .catch((error) => {
        console.log('logout error', error);
      });
  }

  return (
    <View
      style={{
        alignItems: 'center',
        width: '100%',
      }}>
      <TouchableOpacity onPress={handleLogout} style={styles.containerButton}>
        <Text style={styles.buttonTitle}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
