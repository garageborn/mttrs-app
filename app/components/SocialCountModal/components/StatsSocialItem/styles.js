import { StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')
const containerPadding = 20
const itemCount = 3

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: (width / itemCount) - containerPadding
  },
  image: {
    marginHorizontal: 8
  },
  text: {
    alignSelf: 'center',
    color: '#666766'
  }
})

export default styles
