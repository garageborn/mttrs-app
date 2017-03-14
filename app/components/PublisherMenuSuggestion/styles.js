import { StyleSheet } from 'react-native'

export const actionColor = '#23E2D4'
export const dangerColor = '#FF5607'
export const feedbackMessage = {
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

  loading: {
    marginVertical: 10
  },

  button: {
    backgroundColor: actionColor
  },

  buttonText: {
    color: 'black',
    textAlign: 'center'
  }
})

export default styles