import { StyleSheet, Dimensions, Platform } from 'react-native'
const { width, height } = Dimensions.get('window')
const heightOffset = Platform.OS === 'ios' ? 100 : 110

const styles = StyleSheet.create({
  container: {
    width: width / 1.5,
    padding: 10,
    marginTop: 20,
    marginLeft: 8,
    borderRadius: 4,
    backgroundColor: '#FFF',
    elevation: 2,
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2
  }
})

export default styles
