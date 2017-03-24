import { StyleSheet, Platform } from 'react-native'
import { mainComponentHeight as iosHeight } from '../MenuIOS/styles'
import { mainComponentHeight as androidHeight } from '../MenuAndroid/styles'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: Platform.select({
      ios: iosHeight,
      android: androidHeight
    })
  }
})

export default styles
