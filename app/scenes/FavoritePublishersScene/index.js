import React from 'react'
import FavoritePublishersContainer from '../../containers/FavoritePublishersContainer'
import FavoritesTitleContainer from '../../containers/FavoritesTitleContainer'
import HeaderSettingsContainer from '../../containers/HeaderSettingsContainer'
import HeaderLeft from '../../components/HeaderLeft'
import headerStyles from '../../styles/Header'

const FavoritePublishersScene = () => (
  <FavoritePublishersContainer />
)

FavoritePublishersScene.navigationOptions = props => {
  return {
    headerLeft: <HeaderLeft {...props} />,
    headerTitle: <FavoritesTitleContainer {...props} />,
    headerRight: <HeaderSettingsContainer />,
    ...headerStyles
  }
}

export default FavoritePublishersScene
