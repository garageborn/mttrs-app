import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import { NavigationActions } from '../../actions/index'

class LinkNotificationContainer extends Component {
  componentWillReceiveProps (nextProps) {
    this.handleResult(nextProps)
  }

  render () {
    return null
  }

  handleResult (nextProps) {
    if (nextProps.data.loading) return
    if (this.props.data.loading === nextProps.data.loading) return
    return this.props.dispatch(NavigationActions.link(nextProps.model.story, nextProps.data.link))
  }
}

LinkNotificationContainer.propTypes = {
  model: PropTypes.object.isRequired
}

const LinkNotificationContainerWithData = withQuery(LinkNotificationContainer)
export default connect()(LinkNotificationContainerWithData)
