import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import FavoritePublishersHeading from '../FavoritePublishersHeading'
import FavoritePublishersManagerButton from '../FavoritePublishersManagerButton'
import styles from './styles'

const FavoritePublishersManager = ({ handleButtonPress, handleComplete, renderPublisherList}) => (
  <View style={styles.container}>
    <FavoritePublishersHeading handleComplete={handleComplete} />
      {renderPublisherList}
    <FavoritePublishersManagerButton onPress={handleButtonPress} />
  </View>
)

FavoritePublishersManager.propTypes = {
  handleButtonPress: PropTypes.func.isRequired,
  renderPublisherList: PropTypes.object.isRequired,
  handleComplete: PropTypes.func.isRequired
}

export default FavoritePublishersManager
