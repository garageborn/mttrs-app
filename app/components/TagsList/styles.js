import { StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    maxHeight: 40,
    width,
    flexDirection: 'row'
  },
  containerStyle: {
    backgroundColor: '#F1F1F1',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center'
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default styles
