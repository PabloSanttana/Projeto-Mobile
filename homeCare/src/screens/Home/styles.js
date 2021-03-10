import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
import {colors} from '../../constants/index';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    color: '#fff',
    marginBottom: 30,
  },
});
