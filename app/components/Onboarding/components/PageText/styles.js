import { StyleSheet, Dimensions, Platform } from 'react-native'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    backgroundColor: '#FFF',
    paddingHorizontal: 25,
    height: Platform.select({
      ios: 160,
      android: 140
    }),
    width
  }
})

export default styles
