import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
import {colors} from '../../constants';

export default StyleSheet.create({
  containerButton: {
    width: width * 0.7,
    height: 50,
    backgroundColor: colors.backgroundColorClear,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonTitle: {
    color: colors.textColorActive,
    fontSize: 18,
    fontWeight: 'bold',
  },
  containerButtonColor: {
    backgroundColor: colors.backgroundColorButton,
  },
  buttonTitleColor: {
    color: colors.textColorClear,
  },
});
