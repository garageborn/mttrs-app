/* eslint-disable react/jsx-no-bind */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _debounce from 'lodash/debounce'
import { NavigationActions } from '../../actions/index'
import StoryLink from '../../components/StoryLink'

class StoryLinkContainer extends Component {
  constructor () {
    super()
    this.openLink = _debounce(this.openLink.bind(this), 100)
    this.openPublisher = _debounce(this.openPublisher.bind(this), 100)
  }

  render () {
    const { link, type } = this.props
    return (
      <StoryLink
        linkType={type}
        link={link}
        openLink={this.openLink}
        openPublisher={this.openPublisher}
      />
    )
  }

  openLink (link) {
    let { dispatch, story } = this.props
    if (!story) return
    dispatch(NavigationActions.closeModal())
    dispatch(NavigationActions.link(story, link))
  }

  openPublisher (publisher) {
    let { dispatch } = this.props
    dispatch(NavigationActions.closeModal())
    dispatch(NavigationActions.publisher(publisher))
  }
}

StoryLinkContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    publisher: PropTypes.object.isRequired
  }).isRequired,
  story: PropTypes.object.isRequired,
  renderOptions: PropTypes.shape({
    timelineType: PropTypes.string,
    publisherSlug: PropTypes.string
  })
}

export default connect()(StoryLinkContainer)
