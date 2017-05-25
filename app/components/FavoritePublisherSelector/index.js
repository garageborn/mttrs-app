import React, { PropTypes, Component } from 'react'
import { View } from 'react-native'
import * as cloudinary from '../../common/utils/Cloudinary'
import PublisherLogo from '../PublisherLogo'
import Touchable from '../Touchable'

class FavoritePublisherSelector extends Component {
  constructor () {
    super()
    this.onPress = this.onPress.bind(this)
  }

  render () {
    const { publisher } = this.props
    if (!publisher.icon_id) return null
    const uri = cloudinary.id(publisher.icon_id, { secure: true })

    return (
      <Touchable onPress={this.onPress}>
        <View>
          <PublisherLogo size={30} source={{ uri }} />
        </View>
      </Touchable>
    )
  }

  onPress () {
    const { publisher, onPress } = this.props
    onPress(publisher)
  }
}

FavoritePublisherSelector.propTypes = {
  onPress: PropTypes.func.isRequired,
  publisher: PropTypes.shape({
    id: PropTypes.any.isRequired,
    icon_id: PropTypes.string
  }).isRequired
}

export default FavoritePublisherSelector
