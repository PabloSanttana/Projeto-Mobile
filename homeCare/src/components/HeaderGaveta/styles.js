import {StyleSheet, Dimensions} from 'react-native';

import {colors} from '../../constants';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    paddingBottom: 2,
    paddingHorizontal: 20,
    backgroundColor: colors.backgroundColorSecondary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: colors.textColorClear,
    fontSize: 20,
    marginLeft: 20,
  },
});
