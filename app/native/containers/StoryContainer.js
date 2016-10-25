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
    const { story, section } = this.props

    return (
      <Story
        story={story}
        section={section}
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
    this.props.dispatch(NavigationActions.selectPublisher(this.mainLink.publisher))
  }

  openStoryLinks() {
    if (this.otherLinks.length === 0) return this.openPublisher()
    const { dispatch, story } = this.props
    dispatch(NavigationActions.storyLinks({ story: story, open: true }))
  }

  openMainLink() {
    this.openLink(this.mainLink)
  }

  get mainLink() {
    return this.props.story.main_link
  }

  get otherLinks() {
    return this.props.story.other_links
  }

  get mainCategory() {
    return this.mainLink.categories[0]
  }
}

StoryContainer.propTypes = {
  story: PropTypes.object.isRequired
}

export default connect()(StoryContainer)
