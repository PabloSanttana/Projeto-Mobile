import React, {useState, useEffect, useCallback} from 'react';
import {View, StatusBar, ScrollView, Text, AppState} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import io from 'socket.io-client';

import styles from './styles';
import Header from '../../components/Header';
import RenderCard from '../../components/RenderCard';
import Tabs from '../../components/Tabs';
import {colors, textStatus} from '../../constants';
import {localhost} from '../../services/localhost.json';
import Button from '../../components/Button';
import ModalContainer from '../../components/ModalContainer';
import Maskcpf from '../../Utils/maskCPF';
import {alarme, StopSound} from '../../Utils/alarme';
import {notifications} from 'react-native-firebase';
import api from '../../services/api';
import BackgroundTimer from '../../Utils/ServiceBackground';

window.navigator.userAgent = 'react-native';
const socket = io(localhost, {});

var timerIdServiceBackground;
var isActiveAlerta = false;
var isSocketOff = false;

/// Graficos
var temp = [50, 85];
var tempPA = [];

export default function index() {
  const user = useSelector((state) => state.userData);
  const navigation = useNavigation();
  const [active, setActive] = useState(1);
  const [modalType, setModalType] = useState();
  const [isModalActive, setModalActive] = useState(false);

  const [infBPM, setInfBPM] = useState({
    title: 'Frequência cardíaca',
    sigla: 'BPM',
    status: user.BPM.status,
    valor: user.BPM.valor,
    data: [],
  });
  const [infSaO2, setInfSaO2] = useState({
    title: 'Saturação de oxigênio',
    sigla: 'SaO2',
    status: user.SaO2.status,
    valor: user.SaO2.valor,
  });
  const [infPA, setInfPA] = useState({
    title: 'Pressão arterial',
    sigla: 'PA',
    status: user.PA.status,
    valor: user.PA.valor,
    data: [],
  });

  function puhsInfoCard(params) {
    setActive(params);
  }
  // verificando se o aplicativo esta em background
  const _handleAppStateChange = useCallback(async (nextApppState) => {
    if (nextApppState === 'active') {
      console.log('BackgroundTimer.clearInterval');
      BackgroundTimer.clearInterval(timerIdServiceBackground);
      handleIsActiveAlerta(false);
      try {
        const response = await api.get(`/paciente/status/${user.id}`);
        if (isSocketOff) {
          SocketON();
          setInfBPM({
            ...infBPM,
            status: response.data.BPM.status,
            valor: response.data.BPM.valor,
            data: temp,
          });
          setInfSaO2({
            ...infSaO2,
            status: response.data.SaO2.status,
            valor: response.data.SaO2.valor,
          });
          setInfPA({
            ...infPA,
            status: response.data.PA.status,
            valor: response.data.PA.valor,
            data: tempPA,
          });
        }
        filterVerificationAlerta(
          response.data.BPM,
          response.data.SaO2,
          response.data.PA,
        );
      } catch (error) {}
    } else {
      timerIdServiceBackground = BackgroundTimer.setInterval(() => {
        console.log('BackgroundTimer');
        handleConnetionActivePermanently();
      }, 10000);
    }
  }, []);
  const handleConnetionActivePermanently = useCallback(() => {
    socket.emit('pingConnetion', {}, () => console.log('Connection', true));
  }, []);

  const filterVerificationAlerta = useCallback((dataBPM, dataSaO2, dataPA) => {
    if (dataBPM.status === textStatus.severa) {
      handleActiceAlarme('Frequência cardíaca', textStatus.severa);
    } else if (dataSaO2.status === textStatus.severa) {
      handleActiceAlarme('Saturação de oxigênio', textStatus.severa);
    } else if (dataPA.status === textStatus.severa) {
      handleActiceAlarme('Pressão arterial', textStatus.severa);
    } else {
      StopSound();
    }
  }, []);
  function SocketON() {
    if (user.type === 'paciente') {
      const data = {
        name: user.name,
        cpf: user.cpf,
        CRM: user.CRM,
      };
      socket.emit('join', data, () => {
        isSocketOff = false;
      });
    }
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      SocketON();
      notifications().onNotificationOpened((remoteMessage) => {
        /* console.log('notification', remoteMessage.notification); */
        StopSound();
        handleIsActiveAlerta(false);
        navigation.navigate('Monitoring');
      });
      AppState.addEventListener('change', _handleAppStateChange);
    }
    return () => {
      isMounted = false;
    };
  }, [user.type]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      socket.on('BPM', (response) => {
        /*   console.log('BPM', response.cpf); */
        if (user.cpf === response.cpf && isMounted) {
          temp.push(parseInt(response.valor));
          if (temp.length === 30) {
            temp.splice(2, 1);
          }
          setInfBPM({
            title: 'Frequência cardíaca',
            sigla: 'BPM',
            status: response.Status,
            valor: response.valor,
            data: temp,
          });
          if (response.Status === textStatus.severa) {
            handleActiceAlarme('Frequência cardíaca', response.Status);
          }
        }
      });
      socket.on('SaO2', (response) => {
        console.log('SaO2');
        if (user.cpf === response.cpf && isMounted) {
          setInfSaO2({
            title: 'Saturação de oxigênio',
            sigla: 'SaO2',
            status: response.Status,
            valor: response.valor,
          });
          if (response.Status === textStatus.severa) {
            handleActiceAlarme('Saturação de oxigênio', response.Status);
          }
        }
      });
      socket.on('PA', (response) => {
        if (user.cpf === response.cpf && isMounted) {
          if (response.Status === textStatus.severa) {
            tempPA.push({
              month: 1,
              Bom: 0,
              Alerta: 0,
              Crítico: parseFloat(response.valor),
              transparte: 0,
            });
            handleActiceAlarme('Pressão arterial', response.Status);
          } else if (response.Status === textStatus.moderada) {
            tempPA.push({
              month: 1,
              Bom: 0,
              Alerta: parseFloat(response.valor),
              Crítico: 0,
              transparte: 0,
            });
          } else {
            tempPA.push({
              month: 1,
              Bom: parseFloat(response.valor),
              Alerta: 0,
              Crítico: 0,
              transparte: 0,
            });
          }
          if (tempPA.length === 13) {
            tempPA.splice(0, 1);
          }

          setInfPA({
            title: 'Pressão arterial',
            sigla: 'PA',
            status: response.Status,
            valor: response.valor,
            data: tempPA,
          });
        }
      });
      socket.on('disconnect', (response) => {
        console.log('disconnect');
        isSocketOff = true;
      });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleModalIsactive = useCallback((config) => {
    if (config === 'info') {
      setModalType(1);
    } else {
      setModalType(2);
    }
    setModalActive(true);
  }, []);

  const handelNavigateToChat = useCallback(() => {
    navigation.navigate('ChatModulePatient');
    setModalActive(false);
  }, []);

  function handleIsActiveAlerta(value) {
    isActiveAlerta = value;
  }

  const handleActiceAlarme = useCallback((title, status) => {
    if (!isActiveAlerta) {
      isActiveAlerta = true;
      alarme(
        title,
        status,
        handelNavigateToChat,
        'Relatar',
        handleIsActiveAlerta,
      );
    }
  }, []);

  const ModalType = useCallback(() => {
    if (modalType === 1) {
      return (
        <View>
          <Text style={styles.modalTitle}>Informação do paciente</Text>
          <Text numberOfLines={1} style={styles.modaltext}>
            Nome: {user.name}{' '}
          </Text>
          <Text style={styles.modaltext}>
            CPF: <Maskcpf value={user.cpf} />
          </Text>
          <Text style={styles.modaltext}>Idade: {user.idade}</Text>
          <Text style={styles.modaltext}>Neurologista responsável:</Text>
          <Text style={styles.modaltext}>{user.nameMedico}</Text>
        </View>
      );
    } else {
      return (
        <View style={{alignItems: 'center'}}>
          <Text style={styles.modalTitle}>Relatar Intervenção</Text>

          <Button onpress={handelNavigateToChat} title="Relatar" color={true} />
        </View>
      );
    }
  }, [modalType]);

  return (
    <SafeAreaView>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.backgroundColorSecondary}
      />
      <ScrollView>
        <View style={styles.container}>
          <Header
            title="Monitoramento"
            stack={user.type === 'paciente' ? false : true}
            refresh={active}
          />

          <View style={styles.containerCard}>
            <RenderCard
              BPM={infBPM}
              PA={infPA}
              SaO2={infSaO2}
              user={user.name}
              active={active}
              isModal={handleModalIsactive}
            />
          </View>
          <Tabs
            SaO2={infSaO2.valor}
            SaOsStatus={infSaO2.status}
            labelSa={1}
            onSaO2={puhsInfoCard}
            BPM={infBPM.valor}
            BPMStatus={infBPM.status}
            labelBPM={2}
            onBPM={puhsInfoCard}
            PA={infPA.valor}
            PAStatus={infPA.status}
            labelPA={3}
            onPA={puhsInfoCard}
          />
        </View>
        <ModalContainer active={isModalActive} setActive={setModalActive}>
          {isModalActive && ModalType()}
        </ModalContainer>
      </ScrollView>
    </SafeAreaView>
  );
}
