import { Dimensions, StyleSheet } from 'react-native'
import headerStyles from '../../styles/Header'
const { height } = Dimensions.get('window')
const headerHeight = headerStyles.headerStyle.height
const headingHeight = 80

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: height - headerHeight - headingHeight,
    justifyContent: 'center'
  }
})

export default styles
