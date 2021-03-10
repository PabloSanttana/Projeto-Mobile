import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    padding: 15,
    borderRadius: 5,
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    right: 5,
    zIndex: 1,
  },
});
