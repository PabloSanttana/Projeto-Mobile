import {StyleSheet} from 'react-native';

import {status, colors} from '../../constants';

export default StyleSheet.create({
  container: {
    height: 140,
    paddingTop: 5,
    marginTop: 20,
  },
  scrollview: {
    paddingLeft: 15,
    paddingRight: 15,
    marginRight: 6,
  },
  touch: {
    height: 120,
    width: 120,
    borderRadius: 3,
    backgroundColor: '#fff',
    padding: 8,
    elevation: 5,
    marginRight: 15,
  },
  tabitem: {
    height: '100%',
    width: '100%',
    backgroundColor: '#ffff',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: '#000',
  },
  critico: {
    backgroundColor: status.critico,
    width: '90%',
    height: '20%',
    textAlign: 'center',
    borderRadius: 5,
    fontWeight: 'bold',
  },
  bom: {
    backgroundColor: status.bom,
    width: '90%',
    height: '20%',
    fontSize: 16,
    textAlign: 'center',
    borderRadius: 5,
    fontWeight: 'bold',
  },
  alerta: {
    backgroundColor: status.alerta,
    width: '90%',
    height: '20%',
    textAlign: 'center',
    borderRadius: 5,
    fontWeight: 'bold',
  },

  info: {
    fontWeight: 'bold',
    color: colors.textColorPrimary,
    fontSize: 30,
  },
});
