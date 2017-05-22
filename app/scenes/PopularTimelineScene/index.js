import React, { Component, PropTypes } from 'react'
import HomeTimeline from '../../containers/HomeTimeline'
import CategoryTimeline from '../../containers/CategoryTimeline'

class PopularTimelineScene extends Component {
  render () {
    if (this.props.navigation.state.routeName === 'home') return <HomeTimeline />
    const { slug } = this.props.navigation.state.params
    return <CategoryTimeline slug={slug} />
  }
}

PopularTimelineScene.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        slug: PropTypes.string
      })
    }).isRequired
  }).isRequired
}

export default PopularTimelineScene
