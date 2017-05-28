import React, { Component } from 'react'
import AddFavoritesContainer from '../../containers/AddFavoritesContainer'
import FavoritesTitleContainer from '../../containers/FavoritesTitleContainer'
import HeaderSettingsContainer from '../../containers/HeaderSettingsContainer'
import HeaderLeft from '../../components/HeaderLeft'
import headerStyles from '../../styles/Header'

class AddFavoritesScene extends Component {
  render () {
    return <AddFavoritesContainer />
  }
}

AddFavoritesScene.navigationOptions = props => {
  return {
    headerLeft: <HeaderLeft {...props} />,
    headerTitle: <FavoritesTitleContainer {...props} />,
    headerRight: <HeaderSettingsContainer />,
    ...headerStyles
  }
}

export default AddFavoritesScene
