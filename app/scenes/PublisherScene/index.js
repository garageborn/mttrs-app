import React, { Component, PropTypes } from 'react'
import PublisherTimelineContainer from '../../containers/PublisherTimelineContainer'
import HeaderTitleContainer from '../../containers/HeaderTitleContainer'
import HeaderRight from '../../components/HeaderRight'
import HeaderLeft from '../../components/HeaderLeft'
import headerStyles from '../../styles/Header'

class PublisherScene extends Component {
  render () {
    const { publisher } = this.props.navigation.state.params
    return <PublisherTimelineContainer publisher={publisher} />
  }
}

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
    headerTitle: <HeaderTitleContainer type='publisher' {...props} />,
    headerRight: <HeaderRight />,
    headerLeft: <HeaderLeft {...props} />,
    ...headerStyles
  }
}

export default PublisherScene
