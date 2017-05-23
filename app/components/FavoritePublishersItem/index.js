import React, { PropTypes, Component } from 'react'
import { View, Text } from 'react-native'
import ToggleFavoriteContainer from '../../containers/ToggleFavoriteContainer'
import PublisherLogo from '../PublisherLogo'
import * as cloudinary from '../../common/utils/Cloudinary'

class FavoritePublishersItem extends Component {
  render () {
    const { publisher } = this.props

    return (
      <ToggleFavoriteContainer
        publisher={publisher}
        addComponent={this.addPublisherComponent()}
        removeComponent={this.removePublisherComponent()}
      />
    )
  }

  addPublisherComponent () {
    return (
      <View>
        {this.renderIcon()}
        <Text>{this.publisherName} Add</Text>
      </View>
    )
  }

  removePublisherComponent () {
    return (
      <View>
        {this.renderIcon()}
        <Text>{this.publisherName} Remove</Text>
      </View>
    )
  }

  renderIcon () {
    let { publisher } = this.props
    if (!publisher.icon_id) return
    const uri = cloudinary.id(publisher.icon_id, { secure: true })
    return <PublisherLogo size={30} source={{ uri }} />
  }

  get publisherName () {
    const { publisher } = this.props
    return publisher.display_name || publisher.name
  }
}

FavoritePublishersItem.propTypes = {
  publisher: PropTypes.shape({
    id: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    display_name: PropTypes.string,
    icon_id: PropTypes.string
  }).isRequired
}

export default FavoritePublishersItem
