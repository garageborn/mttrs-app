import React, { PropTypes, Component } from 'react'
import { View, Text } from 'react-native'
import * as cloudinary from '../../common/utils/Cloudinary'
import PublisherLogo from '../PublisherLogo'
import Touchable from '../Touchable'

class FavoritePublisherSelector extends Component {
  render () {
    const { onPress } = this.props

    return (
      <Touchable onPress={onPress}>
        {this.renderPublisherLogo()}
      </Touchable>
    )
  }

  renderPublisherLogo () {
    const { selected } = this.props

    if (selected) {
      return (
        <View>
          {this.renderLogo()}
          <Text>selected</Text>
        </View>
      )
    } else {
      return <View>{this.renderLogo()}</View>
    }
  }

  renderLogo () {
    const { publisher } = this.props
    if (!publisher.icon_id) return null
    const uri = cloudinary.id(publisher.icon_id, { secure: true })
    return <PublisherLogo size={30} source={{ uri }} />
  }
}

FavoritePublisherSelector.propTypes = {
  onPress: PropTypes.func.isRequired,
  publisher: PropTypes.shape({
    id: PropTypes.any.isRequired,
    icon_id: PropTypes.string
  }).isRequired,
  selected: PropTypes.bool.isRequired
}

export default FavoritePublisherSelector
