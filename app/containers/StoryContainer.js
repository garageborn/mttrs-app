import React, { Component, PropTypes } from 'react'
import { View,Text } from 'react-native'
import { connect } from 'react-redux'
import Story from '../components/Story'
import { NavigationActions, StorageActions, AnalyticsActions } from '../actions/index'

class StoryContainer extends Component {
  constructor (props) {
    super(props)
    this.openLink = this.openLink.bind(this)
    this.openStoryLinks = this.openStoryLinks.bind(this)
    this.openMainLink = this.openMainLink.bind(this)
    this.openCategory = this.openCategory.bind(this)
  }

  componentWillMount () {
    // this.props.dispatch(StorageActions.getVisitedStories())
  }

  render () {
    const { scrollToY, story, timelineRef, visited } = this.props
    return <View><Text>{story.main_link.title}</Text></View>
    return (
      <Story
        story={story}
        openLink={this.openMainLink}
        openCategory={this.openCategory}
        openStoryLinks={this.openStoryLinks}
        visited={visited}
        scrollToY={scrollToY}
        timelineRef={timelineRef}
      />
    )
  }

  openLink (link) {
    const { dispatch } = this.props
    dispatch(AnalyticsActions.trackLink(link))
    dispatch(NavigationActions.link(this.props.story, link))
  }

  openCategory () {
    this.props.dispatch(NavigationActions.selectCategory(this.mainCategory))
  }

  openStoryLinks () {
    const { dispatch, story } = this.props
    dispatch(NavigationActions.storyLinks({ story: story, open: true }))
  }

  openMainLink () {
    this.openLink(this.mainLink)
  }

  get mainLink () {
    return this.props.story.main_link
  }

  get mainCategory () {
    return this.props.story.main_category
  }
}

StoryContainer.propTypes = {
  story: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  visited: PropTypes.bool,
  timelineRef: PropTypes.object,
  scrollToY: PropTypes.func.isRequired
}

let mapStateToProps = (state, ownProps) => {
  let isVisited = state.StorageReducer.visitedStories.items.indexOf(ownProps.story.id) !== -1

  return {
    visited: isVisited
  }
}

export default connect(mapStateToProps)(StoryContainer)
