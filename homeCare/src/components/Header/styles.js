import {StyleSheet} from 'react-native';

import {colors, status} from '../../constants';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    paddingBottom: 2,
    paddingHorizontal: 20,
    backgroundColor: colors.backgroundColorSecondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.textColorClear,
    fontSize: 20,
    marginLeft: 20,
  },
  containerNotification: {
    position: 'relative',
  },
  notification: {
    position: 'absolute',
    backgroundColor: status.critico,
    width: 20,
    textAlign: 'center',
    zIndex: 1,
    top: -6,
    right: 10,
    borderRadius: 30,
    color: colors.textColorClear,
  },
});
