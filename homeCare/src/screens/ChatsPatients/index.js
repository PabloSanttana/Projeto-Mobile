import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';

import styles from './styles';
import Header from '../../components/Header';
import api from '../../services/api';
import ListChatsPatients from '../../components/ListChatsPatients';
import {colors} from '../../constants';

export default function index() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {type, cpf, CRM} = useSelector((state) => state.userData);
  const [data, setData] = useState([]);
  const [data_temp, setData_temp] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getPacientsChats();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  function handleSearch(text) {
    setSearch(text);
    let data = [];
    if (data_temp.length > 0) {
      data = data_temp.filter((item) => {
        return item.name.toLowerCase().includes(text.toLowerCase());
      });
    }

    /* if (data.length === 0) {
      setSearchFalid(true);
    } else {
      setSearchFalid(false);
    } */
    setData(data);
  }

  function getPacientsChats() {
    setLoading(true);
    api
      .get('meuspaciente', {
        params: {CRM},
      })
      .then((response) => {
        setData(response.data);
        setData_temp(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
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

  async function refreshList() {
    setRefreshing(true);
    await getPacientsChats();
    setRefreshing(false);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Header title="Chats Pacientes" />
        <View style={styles.containerInput}>
          <TextInput
            style={styles.inputSearch}
            value={search}
            onChangeText={handleSearch}
            placeholder="Nome..."
            placeholderTextColor="#fff"
          />
          {search.length > 0 && (
            <TouchableOpacity
              style={styles.iconClear}
              onPress={() => handleSearch('')}>
              <AntDesign
                name="closecircle"
                size={25}
                color={colors.backgroundColorClear}
              />
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <ListChatsPatients item={item} navigate={hanleNavogateToChat} />
          )}
          onRefresh={refreshList}
          refreshing={refreshing}
          ListEmptyComponent={NotFound}
          ListFooterComponent={
            loading && (
              <ActivityIndicator
                size="small"
                color="#5663FF"
                style={{marginVertical: 30}}
              />
            )
          }
        />
      </View>
    </SafeAreaView>
  );
}
