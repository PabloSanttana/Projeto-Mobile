import {StyleSheet} from 'react-native';

import {colors} from '../../constants';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  containerCard: {
    marginTop: 40,
  },

  // Modal

  modalTitle: {
    fontSize: 23,
    color: colors.textColorDark,
    textAlign: 'center',
    marginBottom: 10,
  },
  modaltext: {
    fontSize: 18,
    marginVertical: 5,
  },
});
