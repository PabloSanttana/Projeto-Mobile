import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');
import {colors} from '../../../constants';

export default StyleSheet.create({
  container: {
    width: width * 0.8,
    flexDirection: 'row',
  },
  lineChart: {
    width: width * 0.7,
    height: width * 0.46,
  },
  value: {
    fontSize: 40,
    color: colors.textColorPrimary,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  text: {color: colors.textColorDark, fontSize: 17},
});
