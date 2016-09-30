import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Router from '../config/Router'
import { NavigationActions } from '@exponent/ex-navigation'
import Story from '../components/Story'

class StoryContainer extends Component {
  constructor(props) {
    super(props)
    this.openLink = this.openLink.bind(this)
    this.openStoryLinks = this.openStoryLinks.bind(this)
    this.openMainLink = this.openMainLink.bind(this)
  }

  openLink(link) {
    const { dispatch, navigation } = this.props
    let route = Router.getRoute('link', { link: link })
    dispatch(NavigationActions.push(navigation.currentNavigatorUID, route))
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
    console.log('openLink')
    // const { dispatch, navigation } = this.props
    // let route = Router.getRoute('link', { link: link })
    // dispatch(NavigationActions.push(navigation.currentNavigatorUID, route))
  }

  openCategory() {
    console.log('openCategory')
  }

  openPublisher() {
    console.log('openPublisher')
  }

  openStoryLinks() {
    console.log('openStoryLinks')
    const { dispatch, navigation, params, story } = this.props
    let storyLinksParams = { open: true, story: story }
    let sectionParams = Object.assign({}, params.section, { storyLinks: storyLinksParams })
    let newParams = Object.assign({}, params, { section: sectionParams })
    dispatch(NavigationActions.updateCurrentRouteParams(navigation.currentNavigatorUID, newParams))
  }

  openMainLink() {
    this.openLink(this.mainLink)
  }

  get mainLink() {
    return this.props.story.links[0]
  }
}

StoryContainer.propTypes = {
  story: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  params: PropTypes.object.isRequired
}

let mapStateToProps = (state, ownProps) => {
  return {
    navigation: state.navigation
  }
}

export default connect(mapStateToProps)(StoryContainer)
