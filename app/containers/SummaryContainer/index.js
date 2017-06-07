import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from '../../actions/index'
import StorySummary from '../../components/StorySummary'

class SummaryContainer extends Component {
  constructor () {
    super()
    this.openLink = this.openLink.bind(this)
  }

  shouldComponentUpdate (nextProps) {
    return this.props.visited !== nextProps.visited
  }

  render () {
    const { story, visited } = this.props
    return <StorySummary onPress={this.openLink} story={story} visited={visited} />
  }

  openLink () {
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
