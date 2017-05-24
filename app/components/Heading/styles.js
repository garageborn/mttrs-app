import { StyleSheet } from 'react-native'

const text = {
  color: '#999999'
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },

  regular: {
    ...text,
    fontSize: 14
  }

})

export default styles
