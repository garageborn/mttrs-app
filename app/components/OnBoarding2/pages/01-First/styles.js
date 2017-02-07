import { Platform } from 'react-native'

const styles = {
  image: {
    marginTop: Platform.select({
      ios: 40,
      android: 0
    })
  }
}

export default styles
