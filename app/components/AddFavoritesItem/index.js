import React, { PropTypes, PureComponent } from 'react'
import { View } from 'react-native'
import ToggleFavoriteContainer from '../../containers/ToggleFavoriteContainer'
import PublisherLogo from '../PublisherLogo'
import AddFavoritesPublisher from '../AddFavoritesPublisher'
import * as cloudinary from '../../common/utils/Cloudinary'

class AddFavoritesItem extends PureComponent {
  renderIcon () {
    const { publisher } = this.props
    if (!publisher.icon_id) return null
    const uri = cloudinary.id(publisher.icon_id)
    return <PublisherLogo size={50} source={{ uri }} />
  }

  publisherComponent (active) {
    const { publisher } = this.props
    const publisherName = publisher.display_name || publisher.name
    return (
      <View>
        <AddFavoritesPublisher active={active} icon={this.renderIcon()} name={publisherName} />
      </View>
    )
  }

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
