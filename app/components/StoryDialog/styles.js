import { StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')

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
