import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
import {colors} from '../../constants';

export default StyleSheet.create({
  containerButton: {
    width: width * 0.5,
    height: 50,
    backgroundColor: colors.backgroundColorSecondary,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonTitle: {
    color: colors.textColorClear,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
