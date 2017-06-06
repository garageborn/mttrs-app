import React, { PropTypes } from 'react'
import { Text, View } from 'react-native'
import ToggleFavoriteContainer from '../../containers/ToggleFavoriteContainer'
import PublisherLogo from '../PublisherLogo'
import AddFavoritesPublisherActiveLabel from '../AddFavoritesPublisherActiveLabel'
import * as cloudinary from '../../common/utils/Cloudinary'
import styles from './styles'

const AddFavoritesItem = ({publisher}) => {
  const renderIcon = () => {
    if (!publisher.icon_id) return null
    const uri = cloudinary.id(publisher.icon_id)
    return <PublisherLogo size={50} source={{ uri }} />
  }

  const publisherComponent = (active) => {
    const publisherName = publisher.display_name || publisher.name
    const iconStyle = active ? styles.activeIcon : styles.inactiveIcon

    return (
      <View style={styles.container}>
        <AddFavoritesPublisherActiveLabel active={active} />
        <View style={iconStyle}>{renderIcon()}</View>
        <Text style={styles.text}>{publisherName}</Text>
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
