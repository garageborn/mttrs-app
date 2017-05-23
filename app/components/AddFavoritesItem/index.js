import React, { PropTypes, Component } from 'react'
import { View } from 'react-native'
import ToggleFavoriteContainer from '../../containers/ToggleFavoriteContainer'
import PublisherLogo from '../PublisherLogo'
import AddFavoritesPublisher from '../AddFavoritesPublisher'
import * as cloudinary from '../../common/utils/Cloudinary'

class AddFavoritesItem extends Component {
  render () {
    const { publisher } = this.props

    return (
      <ToggleFavoriteContainer
        publisher={publisher}
        addComponent={this.publisherComponent(false)}
        removeComponent={this.publisherComponent(true)}
      />
    )
  }

  publisherComponent (active) {
    return (
      <View>
        <AddFavoritesPublisher active={active} icon={this.renderIcon()} name={this.publisherName} />
      </View>
    )
  }

  renderIcon () {
    let { publisher } = this.props
    if (!publisher.icon_id) return
    const uri = cloudinary.id(publisher.icon_id, { secure: true })
    return <PublisherLogo size={50} source={{ uri }} />
  }

  get publisherName () {
    const { publisher } = this.props
    return publisher.display_name || publisher.name
  }
}

AddFavoritesItem.propTypes = {
  publisher: PropTypes.shape({
    id: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    display_name: PropTypes.string,
    icon_id: PropTypes.string
  }).isRequired
}

export default AddFavoritesItem
