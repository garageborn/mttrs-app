import React, { PropTypes } from 'react'
import { View } from 'react-native'
import FavoritePublishersHeading from '../FavoritePublishersHeading'
import FavoritePublishersManagerButton from '../FavoritePublishersManagerButton'
import styles from './styles'

const FavoritePublishersManager = ({handleButtonPress, handleComplete, children}) => (
  <View style={styles.container}>
    <FavoritePublishersHeading handleComplete={handleComplete} />
    {children}
    <FavoritePublishersManagerButton onPress={handleButtonPress} />
  </View>
)

FavoritePublishersManager.propTypes = {
  handleButtonPress: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  handleComplete: PropTypes.func.isRequired
}

export default FavoritePublishersManager
