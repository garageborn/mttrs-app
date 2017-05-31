import React, { Component, PropTypes } from 'react'
import { Image, View } from 'react-native'
import HeaderButton from '../HeaderButton'
import ToggleFavoriteContainer from '../../containers/ToggleFavoriteContainer'

class HeaderFavoriteButton extends Component {
  render () {
    const { publisher } = this.props

    return (
      <ToggleFavoriteContainer
        publisher={publisher}
        addComponent={this.addComponent}
        removeComponent={this.removeComponent}
      />
    )
  }

  get addComponent () {
    const content = <Image source={require('./assets/inactive.png')} />
    return (
      <View>
        <HeaderButton content={content} />
      </View>
    )
  }

  get removeComponent () {
    const content = <Image source={require('./assets/active.png')} />
    return (
      <View>
        <HeaderButton content={content} />
      </View>
    )
  }
}

HeaderFavoriteButton.propTypes = {
  publisher: PropTypes.shape({
    id: PropTypes.any.isRequired
  }).isRequired
}

export default HeaderFavoriteButton
