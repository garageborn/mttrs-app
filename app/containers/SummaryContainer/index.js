import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from '../../actions/index'
import StorySummary from '../../components/StorySummary'

const SummaryContainer = ({ story, dispatch }) => {
  const openLink = () => {
    return dispatch(NavigationActions.link(story, story.main_link))
  }

  return <StorySummary onPress={openLink} story={story} />
}

SummaryContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  story: PropTypes.shape({
    main_link: PropTypes.object.isRequired
  }).isRequired
}

export default connect()(SummaryContainer)
