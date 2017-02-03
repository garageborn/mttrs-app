import { StyleSheet, Dimensions, Platform } from 'react-native'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    backgroundColor: '#FFF',
    paddingHorizontal: 25,
    height: Platform.select({
      ios: 180,
      android: 120
    }),
    width
  }
})

export default styles
