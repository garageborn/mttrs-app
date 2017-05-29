import { StyleSheet } from 'react-native'

export const actionColor = '#0B9CFF'
export const dangerColor = '#FF5607'
export const feedbackMessage = {
  fontSize: 13,
  lineHeight: 22,
  textAlign: 'center'
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  title: {
    fontSize: 18,
    color: '#666766',
    marginTop: 30
  },

  subTitle: {
    fontSize: 15,
    color: '#CBCBCB',
    marginVertical: 10
  },

  icon: {
    marginVertical: 20
  },

  publisher: {
    fontSize: 24,
    color: '#666766',
    height: 50
  },

  loading: {
    marginVertical: 10
  },

  buttonContainer: {
    marginBottom: 20
  }
})

export default styles
