import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import styles from './styles';
import Header from '../../components/Header';
import ListNotifications from '../../components/ListNotifications';
import api from '../../services/api';
import Button from '../../components/Button';

export default function index() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.userData);
  const [refresh, setRefresh] = useState(1);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getNotificationsModuleMedico();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  function getNotificationsModuleMedico() {
    api
      .get('/notificacao/medico', {headers: {crm: user.CRM}})
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const NotFound = useCallback(() => {
    return (
      <View style={styles.notfoundContainer}>
        <Text style={styles.titleNotfound}>
          Você não tem pacientes cadastrados ou não encontrados
        </Text>
      </View>
    );
  }, []);

  function hanleNavogateToChat(patiente) {
    /*  console.log(patiente); */
    navigation.navigate('Chats', {patiente});
  }
  function handleClearNotification() {
    api
      .post(
        '/notificacao/medico/clear',
        {},
        {
          headers: {
            crm: user.CRM,
          },
        },
      )
      .then((response) => {
        setRefresh(2);
        navigation.goBack();
      })
      .catch((error) => {
        console.log('errror page notificação', error);
      });
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Header stack={true} title="Notificações" refresh={refresh} />
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <ListNotifications item={item} navigate={hanleNavogateToChat} />
          )}
          ListEmptyComponent={NotFound}
        />
        <View style={{alignItems: 'center'}}>
          <Button
            title="Limpar as Notificações"
            color={true}
            onpress={handleClearNotification}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
