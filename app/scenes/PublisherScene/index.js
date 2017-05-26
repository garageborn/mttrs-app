import React, { PropTypes } from 'react'
import { View } from 'react-native'
import PublisherTimelineContainer from '../../containers/PublisherTimelineContainer'
import PublisherCategoriesDialogContainer from '../../containers/PublisherCategoriesDialogContainer'
import PublisherHeaderTitle from '../../containers/PublisherHeaderTitle'
import PublisherHeaderRight from '../../components/PublisherHeaderRight'
import HeaderLeft from '../../components/HeaderLeft'
import headerStyles from '../../styles/Header'

const PublisherScene = ({navigation}) => (
  <View>
    <PublisherCategoriesDialogContainer publisher={navigation.state.params.publisher} />
    <PublisherTimelineContainer publisher={navigation.state.params.publisher} />
  </View>
)

PublisherScene.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        publisher: PropTypes.shape({
          slug: PropTypes.string.isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  }).isRequired
}

PublisherScene.navigationOptions = props => {
  return {
    headerTitle: <PublisherHeaderTitle {...props} />,
    headerRight: <PublisherHeaderRight />,
    headerLeft: <HeaderLeft {...props} />,
    ...headerStyles
  }
}

export default PublisherScene
