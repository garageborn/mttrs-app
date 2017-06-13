import React, { PropTypes } from 'react'
import { View } from 'react-native'
import * as cloudinary from '../../common/utils/Cloudinary'
import PublisherLogo from '../PublisherLogo'
import Touchable from '../Touchable'
import styles from './styles'

const FavoritePublisherSelector = ({ onPress, publisher }) => {
  if (!publisher.icon_id) return null
  const uri = cloudinary.id(publisher.icon_id)

  return (
    <Touchable onPress={() => onPress(publisher)} underlayColor={'rgba(0,0,0,.1)'}>
      <View style={styles.container}>
        <PublisherLogo size={30} source={{ uri }} />
      </View>
    </Touchable>
  )
}

FavoritePublisherSelector.propTypes = {
  onPress: PropTypes.func.isRequired,
  publisher: PropTypes.shape({
    id: PropTypes.any.isRequired,
    icon_id: PropTypes.string
  }).isRequired
}

export default FavoritePublisherSelector
