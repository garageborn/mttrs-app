import React, { PropTypes} from 'react'
import { View } from 'react-native'
import Touchable from '../Touchable'
import styles from './styles'

const Dialog = ({ children, closeDialog }) => {
  return (
    <Touchable underlayColor={'transparent'} style={styles.overlay} onPress={closeDialog}>
      <View style={styles.container}>
        {children}
      </View>
    </Touchable>
  )
}

Dialog.propTypes = {
  closeDialog: PropTypes.func.isRequired
}

export default Dialog
