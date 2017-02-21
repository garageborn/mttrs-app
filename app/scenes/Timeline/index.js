import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import TimelineHeaderContainer from '../../containers/TimelineHeaderContainer'
import CategoriesTimeline from '../../containers/CategoriesTimeline'
import PublisherTimeline from '../../containers/PublisherTimeline'
import StoryLinksContainer from '../../containers/StoryLinksContainer'
import MenuContainer from '../../containers/MenuContainer'
import { headerHeight } from '../../styles/Global'
import { DARK_COLOR } from '../../constants/Colors'

class TimelineScene extends Component {
  static route = {
    navigationBar: {
      renderTitle: (route) => {
        return <TimelineHeaderContainer params={route.params} />
      },
      renderLeft: () => null,
      renderRight: () => null,
      backgroundColor: DARK_COLOR,
      height: headerHeight
    }
  }

  render () {
    return batata
    return (
      <View>
        {this.renderTimeline()}
        <MenuContainer params={this.props.route.params} />
        {this.renderStoryLinks()}
      </View>
    )
  }

  renderTimeline () {
    if (this.isPublisherSection) {
      return <PublisherTimeline model={this.currentSection.model} />
    } else if (this.isCategoriesSection) {
      return <CategoriesTimeline params={this.props.route.params} />
    }
  }

  renderStoryLinks () {
    const { params } = this.props.route
    let section = params.section || {}
    let storyLinks = section.storyLinks || {}
    let publisherSlug = this.isPublisherSection ? params.section.model.slug : ''

    if (!storyLinks.open) return

    return <StoryLinksContainer story={storyLinks.story} publisherSlug={publisherSlug} />
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
  route: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    uiReducer: state.uiReducer
  }
}

export default connect(mapStateToProps)(TimelineScene)
