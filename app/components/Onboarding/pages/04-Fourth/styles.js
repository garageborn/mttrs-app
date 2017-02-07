import { Platform } from 'react-native'

const styles = {
  image: {
    marginTop: Platform.select({
      ios: 80,
      android: 50
    })
  }
}

export default styles
