import {StyleSheet} from 'react-native';

import {colors} from '../../constants';

export default StyleSheet.create({
  filterButton: {
    backgroundColor: colors.backgroundColorClear,
    borderWidth: 1,
    borderColor: colors.backgroundColorPrimary,
    borderRadius: 5,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  filterButtonText: {
    fontSize: 18,
    color: colors.textColorDark,
  },
  filterButtonActive: {
    backgroundColor: colors.backgroundColorPrimary,
  },
  filterButtonTextActive: {
    color: colors.textColorClear,
  },
});
