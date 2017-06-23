import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import HeaderSwitchLinkButton from '../../components/HeaderSwitchLinkButton'
import StoryLinksModalContainer from '../StoryLinksModalContainer'
import { NavigationActions } from '../../actions/index'
import _result from 'lodash/result'
import withQuery from './index.gql'

class HeaderSwitchLinkContainer extends PureComponent {
  constructor () {
    super()
    this.onPress = this.onPress.bind(this)
  }

  render () {
    const { link, loading } = this.props.data
    if (loading) return null
    if (_result(link, 'story.links_count') === 1) return null
    return <HeaderSwitchLinkButton onPress={this.onPress} />
  }

  onPress () {
    const { dispatch, data, renderOptions } = this.props
    const { story } = data.link
    const content = <StoryLinksModalContainer story={story} renderOptions={renderOptions} />
    dispatch(NavigationActions.storyLinks(story, content))
  }
}

HeaderSwitchLinkContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    link: PropTypes.shape({
      story: PropTypes.shape({
        links_count: PropTypes.number.isRequired
      })
    })
  }).isRequired,
  renderOptions: PropTypes.object
}

const HeaderSwitchLinkContainerWithData = withQuery(HeaderSwitchLinkContainer)
export default connect()(HeaderSwitchLinkContainerWithData)
