import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../constants';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColorClear,
  },
});
