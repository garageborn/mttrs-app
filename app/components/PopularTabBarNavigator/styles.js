import { Dimensions, Platform, StyleSheet } from 'react-native'
import { DARK_COLOR } from '../../constants/Colors'
import headerStyles from '../../styles/Header'
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: Platform.select({
      ios: 4,
      android: 7
    })
  },

  container: {
    ...headerStyles.headerStyle,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: DARK_COLOR,
  },

  indicatorStyle: {
    position: 'absolute',
    bottom: 1,
    height: 3,
    borderRadius: width / 2
  }
})

export default styles
