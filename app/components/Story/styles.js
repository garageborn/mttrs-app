import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    zIndex: 2,
    marginHorizontal: 10,
    marginVertical: 5,
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
