import React, { PropTypes, PureComponent } from 'react'
import { View } from 'react-native'
import ToggleFavoriteContainer from '../../containers/ToggleFavoriteContainer'
import PublisherLogo from '../PublisherLogo'
import AddFavoritesPublisher from '../AddFavoritesPublisher'

class AddFavoritesItem extends PureComponent {
  renderIcon () {
    return <PublisherLogo size={50} source={{ uri: this.props.publisher.icon.medium }} />
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
    icon: PropTypes.shape({
      medium: PropTypes.string
    })
  }).isRequired
}

export default AddFavoritesItem
