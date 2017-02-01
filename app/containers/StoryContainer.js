import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Story from '../components/Story'
import { NavigationActions, StorageActions, AnalyticsActions } from '../actions/index'
import analytics from '../config/Analytics'

class StoryContainer extends Component {
  constructor (props) {
    super(props)
    this.openLink = this.openLink.bind(this)
    this.openStoryLinks = this.openStoryLinks.bind(this)
    this.openMainLink = this.openMainLink.bind(this)
    this.openCategory = this.openCategory.bind(this)
    this.openPublisher = this.openPublisher.bind(this)
  }

  componentWillMount () {
    this.props.dispatch(StorageActions.getVisitedStories())
  }

  render () {
    const { story, section, visited, scrollToY } = this.props
    let isSceneHome = section.type === 'home'

    return (
      <Story
        story={story}
        isSceneHome={isSceneHome}
        openLink={this.openMainLink}
        openCategory={this.openCategory}
        openStoryLinks={this.openStoryLinks}
        visited={visited}
        scrollToY={scrollToY}
      />
    )
  }

  openLink (link) {
    const { section, dispatch } = this.props
    dispatch(AnalyticsActions.trackLink(link))
    dispatch(NavigationActions.link(this.props.story, link))
  }

  openCategory () {
    this.props.dispatch(NavigationActions.selectCategory(this.mainCategory))
  }

  openPublisher () {
    this.props.dispatch(NavigationActions.selectPublisher(this.mainLink.publisher))
  }

  openStoryLinks () {
    const otherLinksCount = this.props.story.other_links_count
    if (otherLinksCount === 0) return this.openPublisher()
    const { dispatch, story } = this.props
    dispatch(NavigationActions.storyLinks({ story: story, open: true }))
  }

  openMainLink () {
    this.openLink(this.mainLink)
  }

  get mainLink () {
    return this.props.story.main_link
  }

  get mainCategory () {
    return this.props.story.main_category
  }
}

StoryContainer.propTypes = {
  story: PropTypes.object.isRequired
}

let mapStateToProps = (state, ownProps) => {
  let isVisited = state.StorageReducer.visitedStories.items.indexOf(ownProps.story.id) !== -1

  return {
    visited: isVisited
  }
}

export default connect(mapStateToProps)(StoryContainer)
