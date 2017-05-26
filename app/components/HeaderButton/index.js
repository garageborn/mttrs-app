import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import Touchable from '../Touchable'
import styles from './styles'

class HeaderButton extends Component {
  render () {
    const { content, onPress } = this.props
    console.log('------------onPress', onPress)
    return (
      <Touchable onPress={onPress} >
        <View style={styles.container}>
          {content}
        </View>
      </Touchable>
    )
  }nada
}

// const HeaderButton = ({ content, onPress }) => (
//   <Touchable onPress={onPress} >
//     <View style={styles.container}>
//       {content}
//     </View>
//   </Touchable>
// )

HeaderButton.propTypes = {
  content: PropTypes.element.isRequired,
  onPress: PropTypes.func
}

export default HeaderButton
