import React, { PropTypes} from 'react'
import { View } from 'react-native'
import Touchable from '../Touchable'
import styles from './styles'

const Dialog = ({ underlayColor, children, closeDialog }) => {
  return (
    <Touchable underlayColor={'transparent'} style={styles.overlay} onPress={closeDialog}>
      <View style={[styles.container, { backgroundColor: underlayColor }]}>
        {children}
      </View>
    </Touchable>
  )
}

Dialog.propTypes = {
  children: PropTypes.any.isRequired,
  closeDialog: PropTypes.func.isRequired,
  underlayColor: PropTypes.string
}

export default Dialog
