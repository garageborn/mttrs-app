import { StyleSheet, Platform, Dimensions } from 'react-native'
const { height } = Dimensions.get('window')
const headerOffset = Platform.OS === 'android' ? 140 : 125

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: height - headerOffset
  }
})

export default styles
