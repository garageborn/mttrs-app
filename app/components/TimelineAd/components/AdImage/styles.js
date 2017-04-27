import { StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')
const cardMargins = 40
const aspectRatio = 1.85

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    height: (width - cardMargins) / aspectRatio,
    width: width - cardMargins
  }
})

export default styles
