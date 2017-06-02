import React from 'react'
import HeaderRight from '../HeaderRight'
import HeaderSettingsContainer from '../../containers/HeaderSettingsContainer'
import HeaderFilterFavoriteCategoriesContainer from '../../containers/HeaderFilterFavoriteCategoriesContainer'
import HeaderAddFavoritesButtonContainer from '../../containers/HeaderAddFavoritesButtonContainer'

const FavoritesHeaderRight = () => (
  <HeaderRight>
    <HeaderFilterFavoriteCategoriesContainer />
    <HeaderAddFavoritesButtonContainer />
    <HeaderSettingsContainer />
  </HeaderRight>
)

export default FavoritesHeaderRight
