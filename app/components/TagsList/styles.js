import { StyleSheet, Dimensions, Platform } from 'react-native'
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width,
    backgroundColor: '#F1F1F1',
    marginTop: Platform.select({
      ios: 20,
      android: 0
    }),
    elevation: 2,
    padding: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)'
  },
  containerActive: {
    elevation: 0
  }
})

export default styles
