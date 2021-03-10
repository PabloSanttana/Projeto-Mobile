import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
import {colors} from '../../constants';

export default StyleSheet.create({
  container: {
    width: width * 0.9,
    height: height * 0.6,
    minHeight: 400,
    backgroundColor: '#ffff',
    borderRadius: 5,
    padding: 10,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    width: '100%',
  },
  label: {
    fontSize: 20,
    color: '#000',
  },
  containerCenter: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    marginVertical: 5,
    color: '#000',
  },
  value: {
    fontSize: 60,
    color: colors.textColorPrimary,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 20,
    marginHorizontal: 20,
    marginBottom: 5,
  },
  containerBarra: {
    width: '100%',
  },
  statusbarra: {
    paddingVertical: 4,
  },
});
