import React, {useState, useEffect, useCallback, memo, useRef} from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  TextInput,
  FlatList,
  Keyboard,
  AppState,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import io from 'socket.io-client';
import {useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import Header from '../../components/Header';
import {colors} from '../../constants';
import {localhost} from '../../services/localhost.json';
import Messages from '../../components/Messages';
import api from '../../services/api';

window.navigator.userAgent = 'react-native';
const socket = io(localhost);

export default function index() {
  const flatlistRef = useRef(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const {type, cpf, CRM} = useSelector((state) => state.userData);
  const {patiente} = useRoute().params;

  function SocketON() {
    const data = {
      cpf: patiente.cpf,
    };
    socket.emit('join', data, () => console.log('emtrou na sala'));
  }

  const _handleAppStateChange = useCallback(async (nextApppState) => {
    if (nextApppState === 'active') {
      SocketON();
      getMessages();
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      SocketON();
      AppState.addEventListener('change', _handleAppStateChange);
      getMessages();
    }
    return () => {
      isMounted = false;
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, [patiente]);

  function getMessages() {
    api
      .get('room/messages', {
        headers: {
          room: patiente.cpf,
        },
      })
      .then((response) => {
        /*  console.log(response.data); */
        setMessages(response.data.messages);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      socket.on('message', (message) => {
        isMounted && setMessages((messages) => [...messages, message]);
      });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSendMessage = useCallback(() => {
    if (message === '') return;

    const bodyMessage = {
      message,
      from: CRM,
      to: patiente.cpf,
      room: patiente.cpf,
    };
    socket.emit('sendMessage', bodyMessage, () => {
      setMessage('');
      Keyboard.dismiss();
    });
  }, [message, CRM]);

  const NotFound = useCallback(() => {
    return (
      <View style={styles.notfoundContainer}>
        <Text style={styles.titleNotfound}>Você não tem Messages</Text>
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.backgroundColorSecondary}
      />
      <View style={styles.container}>
        <Header title="Chat de intervenções" stack={true} />
        <View style={styles.containerHeader}>
          <Text style={styles.headerTitle}>Nome do Paciente:</Text>
          <Text style={styles.headername}>{patiente.name}</Text>
        </View>

        <FlatList
          onContentSizeChange={() =>
            flatlistRef.current.scrollToEnd({animated: true})
          }
          onLayout={() => flatlistRef.current.scrollToEnd({animated: true})}
          ref={flatlistRef}
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <Messages item={item} cpf={cpf} CRM={CRM} type={type} />
          )}
          ListEmptyComponent={NotFound}
        />
        <View style={styles.inputContainer}>
          <TextInput
            value={message}
            maxLength={3000}
            onChangeText={setMessage}
            multiline={true}
            placeholder="Digite um messagem..."
            placeholderTextColor="#fff"
            style={styles.input}
          />
          <TouchableOpacity onPress={handleSendMessage} style={styles.send}>
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
