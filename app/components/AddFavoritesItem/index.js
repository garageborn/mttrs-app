import React, { PropTypes } from 'react'
import { View } from 'react-native'
import ToggleFavoriteContainer from '../../containers/ToggleFavoriteContainer'
import PublisherLogo from '../PublisherLogo'
import AddFavoritesPublisher from '../AddFavoritesPublisher'
import * as cloudinary from '../../common/utils/Cloudinary'

const AddFavoritesItem = ({publisher}) => {
  const renderIcon = () => {
    if (!publisher.icon_id) return null
    const uri = cloudinary.id(publisher.icon_id, { secure: true })
    return <PublisherLogo size={50} source={{ uri }} />
  }

  const publisherComponent = (active) => {
    const publisherName = publisher.display_name || publisher.name
    return (
      <View>
        <AddFavoritesPublisher active={active} icon={renderIcon()} name={publisherName} />
      </View>
    )
  }

  return (
    <ToggleFavoriteContainer
      publisher={publisher}
      addComponent={publisherComponent(false)}
      removeComponent={publisherComponent(true)}
    />
  )
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
