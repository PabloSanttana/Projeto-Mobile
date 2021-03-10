import React, {useEffect, useCallback, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import styles from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import api from '../../services/api';

export default function index({title, stack = false, refresh}) {
  const navigation = useNavigation();
  const [notification, setNotification] = useState('0');
  const [notificationInfo, setNotificationInfo] = useState(null);
  const {type, cpf, CRM} = useSelector((state) => state.userData);

  useEffect(() => {
    let isMounted = true;
    navigation.addListener('focus', () => {
      if (isMounted) {
        type === 'paciente'
          ? getNotificationsModulePatient()
          : getNotificationsModuleMedico();
      }
    });

    return () => {
      isMounted = false;
    };
  }, [navigation?.isDrawerOpen]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (title === 'Monitoramento') {
        type === 'paciente'
          ? getNotificationsModulePatient()
          : getNotificationsModuleMedico();
      }
    }

    return () => {
      isMounted = false;
    };
  }, [refresh]);

  const getNotificationsModulePatient = useCallback(() => {
    api
      .get('/notificacao/paciente', {
        headers: {
          cpf,
        },
      })
      .then((response) => {
        var count = 0;
        count = response.data.countMessage + response.data.statusChange;
        if (count > 9) {
          setNotification('+9');
        } else {
          setNotification(`${count}`);
        }
        setNotificationInfo(response.data);
      })
      .catch((error) => {
        console.log('rrer', error);
      });
  }, []);

  const handleClearNotification = useCallback(() => {
    api
      .post(
        '/notificacao/paciente/clear',
        {},
        {
          headers: {
            cpf,
          },
        },
      )
      .then((response) => {
        setNotification('0');
        setNotificationInfo(response.data);
      })
      .catch((error) => {
        console.log('rrer', error);
      });
  });

  const handleAlert = useCallback(() => {
    Alert.alert(
      'Informação da notificação',
      `Messagem recebidas: ${notificationInfo.countMessage},\nAlterações na clasificação de risco: ${notificationInfo.statusChange}`,
      [
        {
          /*  text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel', */
        },
        {text: 'OK', onPress: handleClearNotification},
      ],
      {cancelable: false},
    );
  }, [notificationInfo]);

  const handleAlertModuleMedico = useCallback(() => {
    Alert.alert(
      'Informação de notificação',
      `Notificações de pacientes: ${notification}`,
      [
        {
          text: 'Fechar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Ver Detalhes',
          onPress: () => handleNavigateToHistoryNotification(),
        },
      ],
      {cancelable: false},
    );
  }, [notification]);

  const getNotificationsModuleMedico = useCallback(() => {
    api
      .get('/notificacao/medico/count', {headers: {crm: CRM}})
      .then((response) => {
        if (response.data.notifications > 9) {
          setNotification('+9');
        } else {
          setNotification(`${response.data.notifications}`);
        }
      })
      .catch((error) => {
        console.log('Header error', error);
      });
  }, []);

  function handleNavigateToHistoryNotification() {
    navigation.navigate('HistoryNotification');
  }

  return (
    <View style={styles.container}>
      {stack ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={30} color="#fff" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="list-bullet" size={30} color="#fff" />
        </TouchableOpacity>
      )}

      <Text style={styles.title}>{title}</Text>
      <View style={styles.containerNotification}>
        <Ionicons name="notifications" size={20} color="#ffff" />
        {type === 'paciente' ? (
          <>
            {notification !== '0' && (
              <Text onPress={handleAlert} style={styles.notification}>
                {notification}
              </Text>
            )}
          </>
        ) : (
          <>
            {notification !== '0' && (
              <Text
                onPress={handleAlertModuleMedico}
                style={styles.notification}>
                {notification}
              </Text>
            )}
          </>
        )}
      </View>
    </View>
  );
}
