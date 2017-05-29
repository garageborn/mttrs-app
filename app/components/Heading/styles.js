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
    fontSize: 14,
    lineHeight: 2
  },

  large: {
    ...text,
    fontSize: 18,
    lineHeight: 2
  },

  huge: {
    ...text,
    fontSize: 24,
    lineHeight: 2
  }

})

export default styles
