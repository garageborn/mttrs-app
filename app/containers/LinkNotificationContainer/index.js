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
    if (props.data.loading) return

    InteractionManager.runAfterInteractions(() => {
      return this.props.dispatch(NavigationActions.link(props.model.story, props.data.link))
    })
  }
}

LinkNotificationContainer.propTypes = {
  model: PropTypes.object.isRequired
}

const LinkNotificationContainerWithData = withQuery(LinkNotificationContainer)
export default connect()(LinkNotificationContainerWithData)
