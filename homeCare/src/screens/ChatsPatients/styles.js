import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../constants';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColorClear,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: colors.backgroundColorSecondary,
    borderRadius: 20,
    height: 45,
    position: 'relative',
  },
  inputSearch: {
    color: '#fff',
    paddingHorizontal: 20,
    paddingRight: 30,
    fontSize: 20,
    flex: 1,
    marginRight: 10,
  },
  iconClear: {
    position: 'absolute',
    right: 10,
  },
  notfoundContainer: {
    flex: 1,
    height: height / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleNotfound: {
    fontSize: 20,
    color: colors.textColorSecondary,
    textAlign: 'center',
    marginHorizontal: 30,
  },
});
