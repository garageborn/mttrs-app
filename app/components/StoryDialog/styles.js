import { StyleSheet, Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    width: width / 1.5,
    alignSelf: 'center',
    padding: 10,
    marginTop: height / 3,
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
