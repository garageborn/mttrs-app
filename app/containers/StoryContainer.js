import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Story from '../components/Story'
import { NavigationActions } from '../actions/index'

class StoryContainer extends Component {
  constructor (props) {
    super(props)
    this.openLink = this.openLink.bind(this)
    this.openStoryLinks = this.openStoryLinks.bind(this)
    this.openMainLink = this.openMainLink.bind(this)
  }

  render () {
    const { scrollToY, story, timelineRef, visited } = this.props
    return (
      <Story
        story={story}
        openLink={this.openMainLink}
        openStoryLinks={this.openStoryLinks}
        visited={visited}
        scrollToY={scrollToY}
        timelineRef={timelineRef}
      />
    )
  }

  openLink (link) {
    const { dispatch } = this.props
    dispatch(NavigationActions.link(this.props.story, link))
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
