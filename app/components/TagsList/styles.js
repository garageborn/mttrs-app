import { StyleSheet, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: '#F1F1F1',
    elevation: 2,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)'
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default styles
