import React from 'react'
import HeaderRight from '../HeaderRight'
import HeaderSettingsContainer from '../../containers/HeaderSettingsContainer'
import HeaderAddFavoritesButtonContainer from '../../containers/HeaderAddFavoritesButtonContainer'

const FavoritePublishersHeaderRight = () => (
  <HeaderRight>
    <HeaderAddFavoritesButtonContainer />
    <HeaderSettingsContainer />
  </HeaderRight>
)

export default FavoritePublishersHeaderRight
