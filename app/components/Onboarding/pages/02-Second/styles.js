import { Platform, Dimensions } from 'react-native'
import { iphoneWidthSmall } from '../../../../styles/Global'

const { width } = Dimensions.get('window')
const iOSTop = width === iphoneWidthSmall ? 0 : 40

const styles = {
  image: {
    marginTop: Platform.select({
      ios: iOSTop,
      android: 20
    })
  }
}

export default styles
