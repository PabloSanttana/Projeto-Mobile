import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  AppState,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import Entypo from 'react-native-vector-icons/Entypo';

import styles from './styles';
import Header from '../../components/Header';
import {colors} from '../../constants';
import ListPatients from '../../components/ListPatients';
import api from '../../services/api';
import ButtonFilter from '../../components/ButtonFilter';
import ModalContainer from '../../components/ModalContainer';

export default function index() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [isSpinner, seTIsSpinner] = useState(false);
  const [buttonisAcitve, setButtonisActive] = useState({
    BPM: true,
    SaO2: false,
    PA: false,
  });
  const {CRM} = useSelector((state) => state.userData);
  const [isModalActive, setIsModalActive] = useState(false);

  function hanleNavogateToMonitoramento(monitoramentoPaciente) {
    navigation.navigate('MonitoringStack', {monitoramentoPaciente});
  }

  // verificando se o aplicativo esta em background
  const _handleAppStateChange = useCallback(async (nextApppState) => {
    if (nextApppState === 'active') {
      handleFilter(true, false, false);
    }
  }, []);

  function handleGetpatients(bpm, sao2, pa) {
    seTIsSpinner(true);
    api
      .get('/meuspaciente/classificacao', {
        params: {
          CRM,
          BPM: bpm,
          SaO2: sao2,
          PA: pa,
        },
      })
      .then((response) => {
        setData(response.data);
        seTIsSpinner(false);
      })
      .catch((error) => {
        console.log(error);
        seTIsSpinner(false);
      });
  }

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
  }, []);

  useEffect(() => {
    let isMounted = true;
    navigation.addListener('focus', () => {
      if (isMounted) {
        seTIsSpinner(true);
        handleFilter(true, false, false);
        console.log('focus');
      }
    });
    return () => {
      isMounted = false;
    };
  }, [navigation?.isDrawerOpen]);

  async function handleFilter(BPM, SaO2, PA) {
    await setButtonisActive({
      BPM: BPM,
      SaO2: SaO2,
      PA: PA,
    });
    handleGetpatients(BPM, SaO2, PA);
  }

  const NotFound = useCallback(() => {
    return (
      <View style={styles.notfoundContainer}>
        <Text style={styles.titleNotfound}>
          Você não tem pacientes cadastrados
        </Text>
      </View>
    );
  }, []);

  const LabelButton = useCallback((label, description) => {
    return (
      <View style={styles.containerLabelButton}>
        <Text style={styles.label}>{label}:</Text>
        <Text style={styles.description}>{description}</Text>
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
        <Header title="Meus Pacientes" />
        <View>
          <View style={styles.containerTitle}>
            <TouchableOpacity onPress={() => setIsModalActive(true)}>
              <Entypo
                name="info-with-circle"
                size={25}
                color={colors.textColor02}
              />
            </TouchableOpacity>
            <Text style={styles.title}>
              Classificação de risco filtrado por:
            </Text>
          </View>

          <View style={styles.ContainerGroupButton}>
            <ButtonFilter
              title="BPM"
              Active={buttonisAcitve.BPM}
              handleFilter={handleFilter}
            />
            <ButtonFilter
              title="SaO2"
              Active={buttonisAcitve.SaO2}
              handleFilter={handleFilter}
            />
            <ButtonFilter
              title="PA"
              Active={buttonisAcitve.PA}
              handleFilter={handleFilter}
            />
          </View>
        </View>
        <Spinner
          visible={isSpinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <ListPatients item={item} navigate={hanleNavogateToMonitoramento} />
          )}
          ListEmptyComponent={NotFound}
        />
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('ClassificationPatients')}
          style={styles.containerButton}>
          <Text style={styles.buttonTitle}>Classificações dos pacientes</Text>
        </TouchableOpacity> */}
        <ModalContainer active={isModalActive} setActive={setIsModalActive}>
          <Text style={styles.titleModal}>Classificações de risco</Text>

          {LabelButton('BPM', 'Frequência cardíaca')}
          {LabelButton('SaO2', 'Saturação de oxigênio')}
          {LabelButton('PA', 'Pressão arterial')}

          <Text style={styles.subTitleModal}>
            Ordem de prioridade na listagem:
          </Text>
          <Text style={styles.listText}>1 Severa</Text>
          <Text style={styles.listText}>2 Moderada</Text>
          <Text style={styles.listText}>3 Baixa</Text>
        </ModalContainer>
      </View>
    </SafeAreaView>
  );
}
