import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'
import Story from '../../components/Story'
import { NavigationActions } from '../../actions/index'
import SocialCountModalContainer from '../SocialCountModalContainer'
import StoryLinksModalContainer from '../StoryLinksModalContainer'
import StoryDialogModalContainer from '../StoryDialogModalContainer'

class StoryContainer extends PureComponent {
  constructor () {
    super()
    this.openLink = this.openLink.bind(this)
    this.handleDialogButtonPress = this.handleDialogButtonPress.bind(this)
    this.handlePublishersPress = this.handlePublishersPress.bind(this)
    this.handleSocialCountPress = this.handleSocialCountPress.bind(this)
  }

  openLink () {
    const { dispatch, story } = this.props
    dispatch(NavigationActions.link(story, story.main_link))
  }

  handlePublishersPress () {
    const { dispatch, renderOptions, story } = this.props
    if (story.publishers.length > 1) {
      const content = <StoryLinksModalContainer story={story} renderOptions={renderOptions} />
      return dispatch(NavigationActions.storyLinks(story, content))
    } else {
      return dispatch(NavigationActions.publisher(story.publishers[0]))
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

  render () {
    const { story } = this.props
    return (
      <Story
        story={story}
        openLink={this.openLink}
        handleDialogButtonPress={this.handleDialogButtonPress}
        handlePublishersPress={this.handlePublishersPress}
        handleSocialCountPress={this.handleSocialCountPress}
      />
    )
  }
}

StoryContainer.propTypes = {
  story: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  renderOptions: PropTypes.shape({
    timelineType: PropTypes.string,
    publisherSlug: PropTypes.string
  })
}

export default connect()(StoryContainer)
