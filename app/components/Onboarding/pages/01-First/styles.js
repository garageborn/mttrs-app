import { Platform } from 'react-native'

const styles = {
  image: {
    marginTop: Platform.select({
      ios: 40,
      android: 0
    })
  },

  icon: {
    position: 'relative',
    top: 2,
    marginLeft: 10
  }
}

export default styles
