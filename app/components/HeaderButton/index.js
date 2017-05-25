import React, { Component, PropTypes } from 'react'
import { Image, View } from 'react-native'
import Touchable from '../Touchable'
import styles from './styles'

class HeaderButton extends Component {
  render () {
    return (
      <Touchable onPress={this.props.onPress} >
        <View style={styles.container}>
          <Image source={this.image} />
        </View>
      </Touchable>
    )
  }

  get image () {
    const types = {
      settings: require('./assets/settings.png'),
      back: require('./assets/back.png')
    }

    return types[this.props.type]
  }
}

HeaderButton.propTypes = {
  type: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}

export default HeaderButton
