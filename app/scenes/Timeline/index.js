import React, { Component, PropTypes } from 'react'
import { View, AppState, Platform } from 'react-native'
import TimelineHeaderContainer from '../../containers/TimelineHeaderContainer'
import CategoriesTimelineContainer from '../../containers/CategoriesTimelineContainer'
import PublisherTimeline from '../../containers/PublisherTimeline'
import StoryLinksContainer from '../../containers/StoryLinksContainer'
import SocialCountModalContainer from '../../containers/SocialCountModalContainer'
import { headerHeight } from '../../styles/Global'
import styles from '../../styles/App'
import { DARK_COLOR } from '../../constants/Colors'

class TimelineScene extends Component {
  static route = {
    navigationBar: {
      renderTitle: (route) => <TimelineHeaderContainer params={route.params} />,
      renderLeft: () => null,
      renderRight: () => null,
      backgroundColor: DARK_COLOR,
      height: headerHeight
    }
  }

  render () {
    return (
      <View>
        {this.renderTimeline()}
        {this.renderStoryModal()}
      </View>
    )
  }

  renderTimeline () {
    if (this.isPublisherSection) {
      return <PublisherTimeline model={this.currentSection.model} />
    } else if (this.isCategoriesSection) {
      return <CategoriesTimelineContainer params={this.props.route.params} />
    }
  }

  renderStoryModal () {
    const { params } = this.props.route
    let section = params.section || {}
    let modal = section.modal || {}
    let publisherSlug = this.isPublisherSection ? params.section.model.slug : ''

    if (!modal.open) return

    const components = {
      storyLinks: StoryLinksContainer,
      socialCount: SocialCountModalContainer
    }

    const Component = components[modal.type]

    return <Component story={modal.story} publisherSlug={publisherSlug} />
  }

  get currentSection () {
    const { params } = this.props.route
    return params.section || {}
  }

  get isCategoriesSection () {
    if (!this.currentSection.name) return true
    return this.currentSection.name === 'home' || this.currentSection.name === 'category'
  }

  get isPublisherSection () {
    return this.currentSection.name === 'publisher'
  }
}

TimelineScene.propTypes = {
  route: PropTypes.object.isRequired,
  section: PropTypes.object,
}

export default TimelineScene
