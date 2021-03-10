import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

export default function index({children, active, setActive}) {
  return (
    <Modal
      animationInTiming={500}
      animationOutTiming={900}
      onBackdropPress={() => setActive(false)}
      isVisible={active}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setActive(false)} style={styles.icon}>
          <Icon name="close" size={25} color="gray" />
        </TouchableOpacity>

        {children}
      </View>
    </Modal>
  );
}
