import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Story from '../components/Story'
import { NavigationActions } from '../actions/index'

class StoryContainer extends Component {
  constructor (props) {
    super(props)
    this.openLink = this.openLink.bind(this)
    this.handlePublishersPress = this.handlePublishersPress.bind(this)
    this.handleSocialCountPress = this.handleSocialCountPress.bind(this)
    this.openMainLink = this.openMainLink.bind(this)
  }

  render () {
    const { story, visited } = this.props
    return (
      <Story
        story={story}
        openLink={this.openMainLink}
        handlePublishersPress={this.handlePublishersPress}
        handleSocialCountPress={this.handleSocialCountPress}
        visited={visited}
      />
    )
  }

  openLink (link) {
    const { dispatch } = this.props
    dispatch(NavigationActions.link(this.props.story, link))
  }

  handlePublishersPress () {
    const { dispatch, story } = this.props
    if (story.other_links_count) return dispatch(NavigationActions.modal({ story: story, open: true, type: 'storyLinks' }))
    return dispatch(NavigationActions.selectPublisher(story.main_link.publisher))
  }

  handleSocialCountPress () {
    const { dispatch, story } = this.props
    return dispatch(NavigationActions.modal({ story: story, open: true, type: 'socialCount' }))
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
  visited: PropTypes.bool
}

let mapStateToProps = (state, ownProps) => {
  let isVisited = state.VisitedStoriesReducer.items.indexOf(ownProps.story.id) !== -1

  return {
    visited: isVisited
  }
}

export default connect(mapStateToProps)(StoryContainer)
