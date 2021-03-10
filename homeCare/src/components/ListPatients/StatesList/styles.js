import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  status: {
    marginHorizontal: 5,
  },
  barraStatus: {
    paddingVertical: 1.5,
    borderRadius: 2,
    width: width / 4,
    marginBottom: 3,
  },
});
