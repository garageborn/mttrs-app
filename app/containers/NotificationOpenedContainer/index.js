import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import { NavigationActions } from '../../actions/index'
import isEmpty from 'lodash/isEmpty'

class NotificationsOpenedContainer extends Component {
  componentWillReceiveProps (nextProps) {
    this.handleResult(nextProps)
  }

  render () {
    debugger
    if (this.props.data) return null
    if (this.props.data.loading) return null
    return <View />
  }

  handleResult (nextProps) {
    debugger
    // if (!this.props.data) return
    // if (nextProps.data.loading) return
    // if (this.props.data.loading === nextProps.data.loading) return
    // return this.props.dispatch(NavigationActions.link(nextProps.model.story, nextProps.data.link))
  }
}

NotificationsOpenedContainer.propTypes = {
  children: PropTypes.any,
  model: PropTypes.object.isRequired
}

const NotificationsOpenedContainerWithData = withQuery(NotificationsOpenedContainer)
export default connect()(NotificationsOpenedContainerWithData)
