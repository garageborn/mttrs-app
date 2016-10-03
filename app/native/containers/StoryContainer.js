import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Story from '../components/Story'
import { NavigationActions } from '../actions/index'

class StoryContainer extends Component {
  constructor(props) {
    super(props)
    this.openLink = this.openLink.bind(this)
    this.openStoryLinks = this.openStoryLinks.bind(this)
    this.openMainLink = this.openMainLink.bind(this)
    this.openCategory = this.openCategory.bind(this)
    this.openPublisher = this.openPublisher.bind(this)
  }

  render() {
    const { story } = this.props

    return (
      <Story
        story={story}
        openLink={this.openMainLink}
        openCategory={this.openCategory}
        openStoryLinks={this.openStoryLinks} />
    )
  }

  openLink(link) {
    this.props.dispatch(NavigationActions.link(link))
  }

  openCategory() {
    this.props.dispatch(NavigationActions.category(this.mainCategory))
  }

  openPublisher() {
    this.props.dispatch(NavigationActions.publisher(this.mainLink.publisher))
  }

  openStoryLinks() {
    const { dispatch, story } = this.props
    if (story.links.length <= 1) return this.openPublisher()
    dispatch(NavigationActions.storyLinks({ story: story, open: true }))
  }

  openMainLink() {
    this.openLink(this.mainLink)
  }

  get mainLink() {
    return this.props.story.links[0]
  }

  get mainCategory() {
    return this.mainLink.categories[0]
  }
}

StoryContainer.propTypes = {
  story: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  params: PropTypes.object.isRequired
}

export default connect()(StoryContainer)
