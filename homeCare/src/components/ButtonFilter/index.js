import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import styles from './styles';

export default function index({title, Active, handleFilter}) {
  function handleActiverFilter() {
    if (title === 'BPM') {
      handleFilter(true, false, false);
    } else if (title === 'SaO2') {
      handleFilter(false, true, false);
    } else {
      handleFilter(false, false, true);
    }
  }

  return (
    <TouchableOpacity
      onPress={() => handleActiverFilter()}
      style={[styles.filterButton, Active && styles.filterButtonActive]}>
      <Text
        style={[
          styles.filterButtonText,
          Active && styles.filterButtonTextActive,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
