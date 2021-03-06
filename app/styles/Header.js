import { Platform } from 'react-native'
import { DARK_COLOR } from '../constants/Colors'

export default {
  headerTitleStyle: {
    color: 'white',
    fontWeight: '400',
    fontSize: 16
  },
  headerBackTitleStyle: {
    width: 0,
    color: 'white'
  },
  headerStyle: {
    backgroundColor: DARK_COLOR,
    height: Platform.select({
      ios: 63,
      android: 50
    })
  }
}
