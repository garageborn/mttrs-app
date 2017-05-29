import React, { PropTypes } from 'react'
import FavoritePublishersContainer from '../../containers/FavoritePublishersContainer'
import FavoritesTitleContainer from '../../containers/FavoritesTitleContainer'
import HeaderSettingsContainer from '../../containers/HeaderSettingsContainer'
import HeaderLeft from '../../components/HeaderLeft'
import headerStyles from '../../styles/Header'

const FavoritePublishersScene = ({navigation}) => (
  <FavoritePublishersContainer navigation={navigation} />
)

FavoritePublishersScene.navigationOptions = props => {
  return {
    headerLeft: <HeaderLeft {...props} />,
    headerTitle: <FavoritesTitleContainer {...props} />,
    headerRight: <HeaderSettingsContainer />,
    ...headerStyles
  }
}

FavoritePublishersScene.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired
}

export default FavoritePublishersScene
