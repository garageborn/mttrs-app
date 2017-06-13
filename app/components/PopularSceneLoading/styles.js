import { StyleSheet } from 'react-native'
import headerStyles from '../../styles/Header'

const styles = StyleSheet.create({
  container: {
    ...headerStyles.headerStyle,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default styles
