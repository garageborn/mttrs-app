import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _debounce from 'lodash/debounce'
import Story from '../../components/Story'
import { NavigationActions } from '../../actions/index'
import SocialCountModalContainer from '../SocialCountModalContainer'
import StoryLinksModalContainer from '../StoryLinksModalContainer'
import StoryDialogModalContainer from '../StoryDialogModalContainer'

class StoryContainer extends Component {
  constructor (props) {
    super(props)
    this.openLink = _debounce(this.openLink.bind(this), 100)
    this.handleDialogButtonPress = this.handleDialogButtonPress.bind(this)
    this.handlePublishersPress = _debounce(this.handlePublishersPress.bind(this), 100)
    this.handleSocialCountPress = this.handleSocialCountPress.bind(this)
  }

  shouldComponentUpdate (nextProps) {
    return this.props.visited !== nextProps.visited
  }

  render () {
    const { story, visited } = this.props
    return (
      <Story
        story={story}
        openLink={this.openLink}
        handleDialogButtonPress={this.handleDialogButtonPress}
        handlePublishersPress={this.handlePublishersPress}
        handleSocialCountPress={this.handleSocialCountPress}
        visited={visited}
      />
    )
  }

  openLink () {
    const { dispatch, story } = this.props
    dispatch(NavigationActions.link(this.props.story, story.main_link))
  }

  handlePublishersPress () {
    const { dispatch, renderOptions, story } = this.props
    if (story.other_links_count) {
      const content = <StoryLinksModalContainer story={story} renderOptions={renderOptions} />
      return dispatch(NavigationActions.storyLinks(story, content))
    } else {
      return dispatch(NavigationActions.publisher(story.main_link.publisher))
    }
  }

  handleSocialCountPress () {
    const { dispatch, renderOptions, story } = this.props
    const content = <SocialCountModalContainer story={story} renderOptions={renderOptions} />
    return dispatch(NavigationActions.socialCount(story, content))
  }

  handleDialogButtonPress () {
    const { dispatch, story } = this.props
    const content = <StoryDialogModalContainer story={story} />
    return dispatch(NavigationActions.storyDialog(story, content))
  }
}

StoryContainer.propTypes = {
  story: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  visited: PropTypes.bool,
  renderOptions: PropTypes.shape({
    timelineType: PropTypes.string,
    publisherSlug: PropTypes.string
  })
}

const mapStateToProps = (state, ownProps) => {
  let isVisited = state.VisitedStoriesReducer.items.indexOf(ownProps.story.id) !== -1

  return {
    visited: isVisited
  }
}

export default connect(mapStateToProps)(StoryContainer)
