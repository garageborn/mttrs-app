import { StyleSheet } from 'react-native'

const green = '#23E2D4'
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

  sendButton: {
    backgroundColor: green,
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 2,
    elevation: 2
  },

  label: {
    color: '#2D2D2B'
  },

  success: {
    ...feedbackMessage,
    color: green
  },

  error: {
    ...feedbackMessage,
    color: '#FF5607'
  }
})

export default styles
