import React, { PropTypes } from 'react'
import { View } from 'react-native'
import HeaderSettingsContainer from '../../containers/HeaderSettingsContainer'
import HeaderFavoriteButton from '../HeaderFavoriteButton'
import HeaderFilterPublisherCategoriesContainer from '../../containers/HeaderFilterPublisherCategoriesContainer'
import styles from './styles'

const PublisherHeaderRight = ({navigation}) => {
  const { publisher } = navigation.state.params

  return (
    <View style={styles.container}>
      <HeaderFilterPublisherCategoriesContainer publisher={publisher} />
      <HeaderFavoriteButton publisher={publisher} />
      <HeaderSettingsContainer />
    </View>
  )
}

PublisherHeaderRight.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        publisher: PropTypes.object
      })
    }).isRequired
  }).isRequired
}

export default PublisherHeaderRight
