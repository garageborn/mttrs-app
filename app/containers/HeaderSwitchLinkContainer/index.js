import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import HeaderSwitchLinkButton from '../../components/HeaderSwitchLinkButton'
import StoryLinksModalContainer from '../StoryLinksModalContainer'
import { NavigationActions } from '../../actions/index'

class HeaderSwitchLinkContainer extends Component {
  constructor () {
    super()
    this.onPress = this.onPress.bind(this)
  }

  render () {
    return <HeaderSwitchLinkButton onPress={this.onPress} />
  }

  onPress () {
    const { dispatch, story, renderOptions } = this.props
    const content = <StoryLinksModalContainer story={story} renderOptions={renderOptions} />
    dispatch(NavigationActions.storyLinks(story, content))
  }
}

HeaderSwitchLinkContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  story: PropTypes.object.isRequired,
  renderOptions: PropTypes.object
}

export default connect()(HeaderSwitchLinkContainer)
