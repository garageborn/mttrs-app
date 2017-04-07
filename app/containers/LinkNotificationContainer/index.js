import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { InteractionManager } from 'react-native'
import withQuery from './index.gql'
import { NavigationActions } from '../../actions/index'

class LinkNotificationContainer extends Component {
  componentWillReceiveProps (nextProps) {
    if (this.props.data.loading === nextProps.data.loading) return
    this.openLink(nextProps)
  }

  render () {
    return null
  }

  openLink (props) {
    const { dispatch, model, data } = props
    if (data.loading || !data.link) return

    InteractionManager.runAfterInteractions(() => {
      return dispatch(NavigationActions.link(data.link.story, data.link))
    })
  }
}

LinkNotificationContainer.propTypes = {
  model: PropTypes.shape({
    slug: PropTypes.string.isRequired
  }).isRequired
}

const LinkNotificationContainerWithData = withQuery(LinkNotificationContainer)
export default connect()(LinkNotificationContainerWithData)
