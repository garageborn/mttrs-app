import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from '../../actions/index'
import StorySummary from '../../components/StorySummary'

class SummaryContainer extends Component {
  constructor () {
    super()
    this.handleSummaryPress = this.handleSummaryPress.bind(this)
  }

  render () {
    const { story, visited } = this.props
    return (
      <StorySummary onPress={this.handleSummaryPress} story={story} visited={visited} />
    )
  }

  handleSummaryPress () {
    const { story, dispatch } = this.props
    return dispatch(NavigationActions.link(story, story.main_link))
  }
}

SummaryContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  story: PropTypes.shape({
    main_link: PropTypes.object.isRequired
  }).isRequired,
  visited: PropTypes.bool.isRequired
}

export default connect()(SummaryContainer)
