/* eslint-disable prettier/prettier */
import {StyleSheet, Dimensions} from 'react-native';

import {colors} from '../../constants';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: colors.textColorPrimary,
    fontWeight: 'bold',
    marginLeft: 5,
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
  containerButton: {
    width: '90%',
    height: 50,
    backgroundColor: colors.backgroundColorButton,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  buttonTitle: {
    color: colors.textColorClear,
    fontSize: 18,
    fontWeight: 'bold',
  },
  ContainerGroupButton: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: colors.textColorActive,
  },

  // conteudo Modal

  titleModal: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    color: colors.textColorDark,
  },
  subTitleModal: {
    fontSize: 18,
    marginBottom: 5,
  },
  listText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  containerLabelButton: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 50,
  },
  description: {
    fontSize: 16,
  },
});
