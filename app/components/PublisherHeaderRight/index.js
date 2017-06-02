import React, { PropTypes } from 'react'
import HeaderSettingsContainer from '../../containers/HeaderSettingsContainer'
import HeaderFavoriteButton from '../HeaderFavoriteButton'
import HeaderRight from '../HeaderRight'
import HeaderFilterPublisherCategoriesContainer from '../../containers/HeaderFilterPublisherCategoriesContainer'

const PublisherHeaderRight = ({navigation}) => {
  const { publisher } = navigation.state.params

  return (
    <HeaderRight>
      <HeaderFilterPublisherCategoriesContainer publisher={publisher} />
      <HeaderFavoriteButton publisher={publisher} />
      <HeaderSettingsContainer />
    </HeaderRight>
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
