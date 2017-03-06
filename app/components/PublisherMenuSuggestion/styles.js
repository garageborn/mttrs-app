import { StyleSheet } from 'react-native'

const green = '#23E2D4'
const orange = '#FF5607'
const feedbackMessage = {
  fontSize: 13,
  lineHeight: 22,
  textAlign: 'center'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },

  title: {
    fontSize: 18,
    color: '#F1F1F1',
    marginTop: 30
  },

  subTitle: {
    fontSize: 15,
    color: '#999',
    marginVertical: 10
  },

  icon: {
    marginVertical: 20
  },

  publisher: {
    fontSize: 24,
    color: '#FFF',
    marginTop: 10,
    marginBottom: 35
  },

  button: {
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 2,
    elevation: 2,
    textAlign: 'center'
  },

  sendButton: {
    backgroundColor: green,
    color: '#2D2D2B'
  },

  refreshButton: {
    backgroundColor: orange,
    color: '#FFF',
    width: 130
  },

  success: {
    ...feedbackMessage,
    color: green
  },

  errorContainer: {
    alignItems: 'center'
  },

  errorMessage: {
    position: 'relative',
    marginBottom: 20
  },

  errorText: {
    ...feedbackMessage,
    color: orange
  },

  loading: {
    marginVertical: 10
  }
})

export default styles
