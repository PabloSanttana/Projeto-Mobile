import {StyleSheet, Dimensions} from 'react-native';

import {colors} from '../../constants';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  containerCard: {
    marginTop: 40,
  },
  // header
  containerHeader: {
    paddingHorizontal: 10,
    marginVertical: 10,
    borderBottomWidth: 1,
  },
  headername: {
    fontSize: 18,
    marginLeft: 20,
    color: colors.textColorDark,
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 20,
    color: colors.textColorDark,
  },
  // input
  inputContainer: {
    minHeight: 60,
    maxHeight: 100,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: colors.textColorPrimary,
    color: '#fff',
    paddingHorizontal: 10,
    fontSize: 16,
    flex: 1,
    borderRadius: 20,
    minHeight: 30,
    marginRight: 10,
    paddingVertical: 10,
  },
  send: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 200,
    backgroundColor: colors.textColorPrimary,
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
  },
});
