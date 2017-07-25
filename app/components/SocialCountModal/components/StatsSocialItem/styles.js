import { StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')
const containerPadding = 20
const itemCount = 3

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    marginHorizontal: 4,
    height: 30,
    width: 30
  },
  text: {
    alignSelf: 'center',
    color: '#666766'
  }
})

export default styles
