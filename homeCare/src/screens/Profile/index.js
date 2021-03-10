import React from 'react';
import {View, Text, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';

import styles from './styles';
import Header from '../../components/Header';
import logo from '../../assets/logo.png';
import MaskCPF from '../../Utils/maskCPF';

export default function index(props) {
  const user = useSelector((state) => state.userData);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="Perfil" />
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} resizeMode="center" />
        <View>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.text}>{user.name}</Text>
          <Text style={styles.label}>
            {user.type === 'paciente' ? 'CPF' : 'CRM'}
          </Text>
          <Text style={styles.text}>
            {user.type === 'paciente' ? (
              <MaskCPF value={user.cpf} />
            ) : (
              `${user.CRM}`
            )}
          </Text>
          {user.type === 'paciente' && (
            <>
              {/*   <Text onPress={() => props.navigation.navigate('Teste')}>
                tstes
              </Text> */}
              <Text style={styles.label}>Idade</Text>
              <Text style={styles.text}>{user.idade}</Text>
              <Text style={styles.label}>Neurologista responsável</Text>
              <Text style={styles.text}>{user.nameMedico}</Text>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
