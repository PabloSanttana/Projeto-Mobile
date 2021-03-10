import React, {useState, useEffect} from 'react';
import {Text, Image, View, Animated, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import asyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import {getToken, fcmTokenInitial} from '../../FcmToken';
import styles from './styles';
import {colors} from '../../constants';
import logo from '../../assets/logo.png';
import Button from '../../components/Button';
import {login} from '../../store/modules/user/actions';
import api from '../../services/api';

export default function Home() {
  const dispatch = useDispatch();
  const {width} = Dimensions.get('window');
  const [isSpinner, seTIsSpinner] = useState(false);
  const [containerProfile] = useState(new Animated.Value(width));
  const [containerEnter] = useState(new Animated.Value(0));
  const navigation = useNavigation();

  function handleToLogin(profile) {
    navigation.navigate('Login', {profile});
  }

  async function gethomecareFcmToken() {
    let homecareFcmToken = await asyncStorage.getItem('homecareFcmToken');
    /*  console.log('homecareFcmToken', homecareFcmToken); */
    if (homecareFcmToken === null) {
      fcmTokenInitial();
      homecareFcmToken = await getToken();
      asyncStorage.setItem('homecareFcmToken', homecareFcmToken);
    }
  }

  async function verificationUserAuth() {
    seTIsSpinner(true);
    const data = await asyncStorage.getItem('user');
    const user = await JSON.parse(data);
    if (user !== null) {
      if (user.type === 'paciente') {
        api
          .get(`/paciente/status/${user.id}`)
          .then((response) => {
            const updateStatusInitial = {
              ...user,
              ...response.data,
            };
            dispatch(login(updateStatusInitial));
            navigation.navigate('Entrar');
            seTIsSpinner(false);
          })
          .catch((error) => {
            seTIsSpinner(false);
          });
      } else {
        dispatch(login(user));
        navigation.navigate('Entrar');
        seTIsSpinner(false);
      }
    }
    seTIsSpinner(false);
  }

  useEffect(() => {
    gethomecareFcmToken();
    verificationUserAuth();
  }, []);

  function handleEntrar() {
    Animated.spring(containerProfile, {
      toValue: 0,
      bounciness: 10,
      duration: 250,
      useNativeDriver: true,
    }).start();
    Animated.timing(containerEnter, {
      toValue: -width,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={[colors.backgroundColorPrimary, colors.backgroundColorSecondary]}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}>
      <Image style={styles.logo} source={logo} resizeMode="center" />

      <Text style={styles.title}>monitoramento 24 horas</Text>
      <View style={{position: 'relative'}}>
        <Animated.View
          style={{
            transform: [{translateX: containerEnter}],
          }}>
          <Button onpress={handleEntrar} title="Entrar" />
        </Animated.View>

        <Animated.View
          style={{
            transform: [{translateX: containerProfile}],
            position: 'absolute',
          }}>
          <Button
            onpress={() => handleToLogin('Paciente')}
            title="Módulo Cuidador"
          />
          <Button
            onpress={() => handleToLogin('Médico')}
            title="Módulo Neurologista"
          />
        </Animated.View>
      </View>
      <Spinner
        visible={isSpinner}
        textContent={'Autentanticando o último usuário...'}
        textStyle={{
          color: colors.backgroundColorPrimary,
          fontSize: 25,
          textAlign: 'center',
          height: 80,
          width,
          backgroundColor: '#fff',
        }}
      />
    </LinearGradient>
  );
}
