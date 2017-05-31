import React, { PropTypes } from 'react'
import PublisherTimelineContainer from '../../containers/PublisherTimelineContainer'
import PublisherHeaderTitle from '../../components/PublisherHeaderTitle'
import PublisherHeaderRight from '../../components/PublisherHeaderRight'
import HeaderLeft from '../../components/HeaderLeft'
import headerStyles from '../../styles/Header'

const PublisherScene = ({navigation}) => (
  <PublisherTimelineContainer publisher={navigation.state.params.publisher} />
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
    headerRight: <PublisherHeaderRight {...props} />,
    headerLeft: <HeaderLeft {...props} />,
    ...headerStyles
  }
}

export default PublisherScene
