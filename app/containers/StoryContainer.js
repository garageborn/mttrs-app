import React, { Component, PropTypes } from 'react'
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
    this.openPublisher = this.openPublisher.bind(this)
  }

  componentWillMount () {
    this.props.dispatch(StorageActions.getVisitedStories())
  }

  render () {
    const { story, section, visited, scrollToY, timelineRef } = this.props
    let isHomeScene = section.type === 'home'

    return (
      <Story
        story={story}
        isHomeScene={isHomeScene}
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

  openPublisher () {
    this.props.dispatch(NavigationActions.selectPublisher(this.mainLink.publisher))
  }

  openStoryLinks () {
    const otherLinksCount = this.props.story.other_links_count
    if (otherLinksCount === 0) return this.openPublisher()
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
  section: PropTypes.object,
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
