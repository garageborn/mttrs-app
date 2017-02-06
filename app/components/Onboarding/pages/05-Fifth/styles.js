import { Platform } from 'react-native'

const styles = {
  image: {
    marginTop: Platform.select({
      ios: 40,
      android: 20
    })
  }
}

export default styles
