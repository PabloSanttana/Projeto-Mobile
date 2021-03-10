import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');
import {colors} from '../../../constants';

export default StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
  },
  progressCircle: {
    width: width * 0.52,
    height: width * 0.52,
  },
  infoContainerSaO2: {
    position: 'absolute',
    width: '100%',
    height: width * 0.52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: 50,
    color: colors.textColorPrimary,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 17,
    color: colors.textColorDark,
    marginTop: 5,
  },
});
