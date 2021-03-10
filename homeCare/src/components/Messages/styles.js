import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../constants';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    width,
    paddingHorizontal: 10,
  },
  left: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: 'gray',
    alignSelf: 'flex-start',
    borderRadius: 5,
    marginBottom: 5,
  },
  leftIcon: {
    position: 'absolute',
    transform: [{rotate: '45deg'}],
    top: -7.4,
    left: -5,
  },
  leftText: {
    color: '#fff',
    maxWidth: '80%',
    fontSize: 15,
  },
  leftTemp: {
    color: '#fff',
    fontSize: 10,
    alignSelf: 'flex-end',
  },
  right: {
    alignSelf: 'flex-end',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: colors.backgroundColorSecondary,
  },
  rightIcon: {
    position: 'absolute',
    transform: [{rotate: '45deg'}],
    top: -7.4,
    right: -6,
  },
  rightText: {
    alignSelf: 'flex-end',
    textAlign: 'left',
    color: '#fff',
    maxWidth: '80%',
    fontSize: 15,
  },
  rightTemp: {
    color: '#fff',
    fontSize: 10,
    alignSelf: 'flex-end',
  },
});
