import React, { PropTypes } from 'react'
import { ScrollView } from 'react-native'
import FavoritePublishersHeading from '../FavoritePublishersHeading'
import styles from './styles'

const FavoritePublishersManager = ({handleComplete, children}) => (
  <ScrollView contentContainerStyle={styles.container}>
    <FavoritePublishersHeading handleComplete={handleComplete} />
    {children}
  </ScrollView>
)

FavoritePublishersManager.propTypes = {
  children: PropTypes.node.isRequired,
  handleComplete: PropTypes.func.isRequired
}

export default FavoritePublishersManager
