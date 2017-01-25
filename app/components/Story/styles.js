import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    zIndex: 2,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 2,
    elevation: 2,
    shadowOffset: {
      width: 3,
      height: 2
    },
    shadowColor: '#000',
    shadowOpacity: 0.2
  }
})

export default styles
