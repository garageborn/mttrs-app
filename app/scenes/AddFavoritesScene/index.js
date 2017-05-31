import React, { PropTypes } from 'react'
import AddFavoritesContainer from '../../containers/AddFavoritesContainer'
import FavoritesTitleContainer from '../../containers/FavoritesTitleContainer'
import HeaderSettingsContainer from '../../containers/HeaderSettingsContainer'
import HeaderLeft from '../../components/HeaderLeft'
import headerStyles from '../../styles/Header'

const AddFavoritesScene = ({navigation}) => (
  <AddFavoritesContainer navigation={navigation} />
)

AddFavoritesScene.navigationOptions = props => {
  return {
    headerLeft: <HeaderLeft {...props} />,
    headerTitle: <FavoritesTitleContainer {...props} />,
    headerRight: <HeaderSettingsContainer />,
    ...headerStyles
  }
}

AddFavoritesScene.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default AddFavoritesScene
