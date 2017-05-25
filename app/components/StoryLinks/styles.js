import { StyleSheet, Dimensions, Platform } from 'react-native'
const { width, height } = Dimensions.get('window')
const heightOffset = Platform.OS === 'ios' ? 100 : 110

const styles = StyleSheet.create({
  container: {
    width: width - 16,
    height: height - heightOffset,
    paddingBottom: 2,
    marginTop: 20,
    marginLeft: 8,
    borderRadius: 4,
    backgroundColor: '#FFF'
  },

  header: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    paddingTop: 1,
    backgroundColor: 'rgba(38,44,91,.1)'
  },

  linksList: {
    marginBottom: -15
  },

  gradient: {
    height: 15,
    backgroundColor: 'transparent'
  }
})

export default styles
