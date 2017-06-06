import React, { PropTypes } from 'react'
import { View } from 'react-native'
import styles from './styles'
import FavoritesTimelineContainer from '../../containers/FavoritesTimelineContainer'
import FavoritePublishersSelectorContainer from '../../containers/FavoritePublishersSelectorContainer'

const Favorites = ({ publishersIds }) => (
  <View style={styles.container}>
    <FavoritePublishersSelectorContainer publisherIds={publishersIds} />
    <FavoritesTimelineContainer publisherIds={publishersIds} />
  </View>
)

Favorites.propTypes = {
  publishersIds: PropTypes.array
}

export default Favorites
