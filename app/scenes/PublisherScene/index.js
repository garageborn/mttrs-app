import React, { Component, PropTypes } from 'react'
import PublisherTimelineContainer from '../../containers/PublisherTimelineContainer'

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

export default PublisherScene
