import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Story from '../../components/Story'
import { NavigationActions } from '../../actions/index'
import SocialCountModalContainer from '../SocialCountModalContainer'
import StoryLinksModalContainer from '../StoryLinksModalContainer'
import StoryDialogModalContainer from '../StoryDialogModalContainer'

const StoryContainer = ({ dispatch, renderOptions, story }) => {
  const mainLink = story.main_link

  const openLink = () => {
    dispatch(NavigationActions.link(story, mainLink, renderOptions))
  }

  const handlePublishersPress = () => {
    if (story.publishers.length > 1) {
      const content = <StoryLinksModalContainer story={story} renderOptions={renderOptions} />
      return dispatch(NavigationActions.storyLinks(story, content))
    } else {
      return dispatch(NavigationActions.publisher(story.publishers[0]))
    }
  }

  const handleSocialCountPress = () => {
    const content = <SocialCountModalContainer story={story} renderOptions={renderOptions} />
    return dispatch(NavigationActions.socialCount(story, content))
  }

  const handleDialogButtonPress = () => {
    const content = <StoryDialogModalContainer story={story} />
    return dispatch(NavigationActions.storyDialog(story, content))
  }

  return (
    <Story
      story={story}
      openLink={openLink}
      handleDialogButtonPress={handleDialogButtonPress}
      handlePublishersPress={handlePublishersPress}
      handleSocialCountPress={handleSocialCountPress}
    />
  )
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
