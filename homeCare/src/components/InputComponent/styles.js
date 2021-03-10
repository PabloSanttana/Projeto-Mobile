import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
import {colors} from '../../constants';

export default StyleSheet.create({
  container: {
    width: width * 0.7,
  },
  label: {
    color: colors.textColorClear,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundColorClear,
    fontSize: 18,
    marginBottom: 20,
    color: colors.textColorClear,
    marginTop: 0,
    height: 40,
  },
});
