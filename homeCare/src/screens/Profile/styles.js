import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
import {colors} from '../../constants/index';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: height * 0.05,
    marginHorizontal: 20,
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
    marginBottom: 20,
  },
  label: {
    fontSize: 19,
    color: colors.textColorPrimary,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 10,
    borderBottomWidth: 1,
    color: colors.textColorDark,
    paddingBottom: 5,
    borderColor: colors.textColorPrimary,
  },
});
