import React, {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';

import styles from './styles';

function index({title, Active, handleFilter}) {
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
export default memo(index);
