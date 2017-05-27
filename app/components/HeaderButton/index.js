import React, { PropTypes } from 'react'
import { View } from 'react-native'
import Touchable from '../Touchable'
import styles from './styles'

const HeaderButton = ({ content, onPress }) => {
  if (!onPress) return <View style={styles.container}>{content}</View>
  return (
    <Touchable onPress={onPress} >
      <View style={styles.container}>
        {content}
      </View>
    </Touchable>
  )
}

HeaderButton.propTypes = {
  content: PropTypes.element.isRequired,
  onPress: PropTypes.func
}

export default HeaderButton
