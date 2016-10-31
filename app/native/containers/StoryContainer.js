import React, { Component, PropTypes } from 'react'
import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import Story from '../components/Story'
import { NavigationActions } from '../actions/index'
import _isNil from 'lodash/isNil'

class StoryContainer extends Component {
  constructor(props) {
    super(props)
    this.openLink = this.openLink.bind(this)
    this.openStoryLinks = this.openStoryLinks.bind(this)
    this.openMainLink = this.openMainLink.bind(this)
    this.openCategory = this.openCategory.bind(this)
    this.openPublisher = this.openPublisher.bind(this)

    this.state = {
      visited: false
    }
  }

  componentWillMount() {
    this.checkVisited()
  }

  render() {
    const { story, section } = this.props

    return (
      <Story
        story={story}
        section={section}
        openLink={this.openMainLink}
        openCategory={this.openCategory}
        openStoryLinks={this.openStoryLinks}
        visited={this.state.visited} />
    )
  }

  openLink(link) {
    this.props.dispatch(NavigationActions.link(link))
    this.addLinkToLocalStorage(this.props.story)
    this.setState({visited: true})
  }

  openCategory() {
    this.props.dispatch(NavigationActions.selectCategory(this.mainCategory))
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

  async addLinkToLocalStorage(story) {
    let visitedStories = await AsyncStorage.getItem('visitedStories')

    if (_isNil(visitedStories)) {
      visitedStories = []
    } else {
      this.addStoryToStorage(JSON.parse(visitedStories), story)
    }

    AsyncStorage.setItem('visitedStories', JSON.stringify(visitedStories))
  }

  async checkVisited() {
    const visitedStories = await AsyncStorage.getItem('visitedStories')
    if (!_isNil(visitedStories))
      this.setState({
        visited: visitedStories.indexOf(this.props.story.id) !== -1
      })
  }

  addStoryToStorage(visitedStories, story) {
    const isVisited = visitedStories.indexOf(story.id) !== -1

    if (isVisited) return

    visitedStories = [
      ...visitedStories,
      story.id
    ]
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
