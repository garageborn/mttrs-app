import React, { Component } from 'react'
import { View } from 'react-native'
import TimelineHeaderContainer from '../containers/TimelineHeaderContainer'
import TimelineContainer from '../containers/TimelineContainer'
import StoryLinksContainer from '../containers/StoryLinksContainer'
import { headerHeight } from '../styles/Header'
import { DARK_COLOR } from '../constants/Colors'

class Timeline extends Component {
  static route = {
    navigationBar: {
      renderTitle: (route) => <TimelineHeaderContainer params={route.params} />,
      renderLeft: () => <View />,
      renderRight: () => <View />,
      backgroundColor: DARK_COLOR,
      height: headerHeight
    }
  }

  render () {
    const { route } = this.props
    return (
      <TimelineContainer params={route.params}>
        { this.renderStoryLinks() }
      </TimelineContainer>
    )
  }

  renderStoryLinks () {
    const { params } = this.props.route
    let section = params.section || {}
    let storyLinks = section.storyLinks || {}
    let publisherSlug = ''

    if (!storyLinks.open) return
    if (section.name === 'publisher') publisherSlug = params.section.model.slug

    return <StoryLinksContainer story={storyLinks.story} publisherSlug={publisherSlug} />
  }
}

export default Timeline
