import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
import {colors} from '../../constants';

export default StyleSheet.create({
  superContainer: {
    borderBottomWidth: 1,
    borderColor: colors.textColorActive,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    marginVertical: 1,
    flexDirection: 'row',
    height: 95,
    width,
    alignItems: 'center',
    /*  backgroundColor: 'red', */
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginLeft: 8,
  },
  nameContainer: {
    marginLeft: 10,
    marginTop: 5,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    width: width * 0.8,
  },
});
