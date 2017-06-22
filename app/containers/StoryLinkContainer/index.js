/* eslint-disable react/jsx-no-bind */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from '../../actions/index'
import StoryLink from '../../components/StoryLink'

class StoryLinkContainer extends Component {
  constructor () {
    super()
    this.openLink = this.openLink.bind(this)
    this.openPublisher = this.openPublisher.bind(this)
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
    let { dispatch, story, renderOptions } = this.props
    if (!story) return
    dispatch(NavigationActions.closeModal())
    dispatch(NavigationActions.link(link.slug, renderOptions))
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
