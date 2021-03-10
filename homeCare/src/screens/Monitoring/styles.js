import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'relative',
  },
  containerCard: {
    marginTop: 40,
  },
  buttonAlerta: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'red',
    position: 'absolute',
    top: 50,
    elevation: 20,
    color: colors.textColorClear,
    fontWeight: 'bold',
    fontSize: 20,
    borderRadius: 5,
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
