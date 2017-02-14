import { Platform, Dimensions } from 'react-native'
import { iphoneWidthSmall } from '../../../../styles/Global'

const { width } = Dimensions.get('window')
const iOSTop = width === iphoneWidthSmall ? 40 : 80

const styles = {
  image: {
    marginTop: Platform.select({
      ios: iOSTop,
      android: 50
    })
  }
}

export default styles
