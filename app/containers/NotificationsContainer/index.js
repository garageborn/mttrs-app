import React, { Component, PropTypes } from 'react'
import OneSignal from 'react-native-onesignal'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import { NavigationActions, NotificationsActions } from '../../actions/index'

class NotificationsContainer extends Component {
  constructor () {
    super()
    this.handleOpen = this.handleOpen.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }
  componentWillMount () {
    OneSignal.addEventListener('opened', this.handleOpen)
    OneSignal.addEventListener('received', (data) => console.log(data))
    OneSignal.addEventListener('registered', this.handleRegister)
  }

  componentWillUnmount () {
    OneSignal.removeEventListener('opened', this.handleOpen)
    OneSignal.removeEventListener('registered', this.handleRegister)
  }

  componentWillReceiveProps (nextProps) {
    this.handlePermissions(nextProps)
  }

  render () {
    console.log(this.props.data)
    return this.props.children
  }

  handleOpen (result) {
    let { model } = result.notification.payload.additionalData
    return this.props.data.fetchMore({ variables: { id: model.id, slug: model.slug } })
  }

  handleRegister () {
    console.log('registered')
  }

  handlePermissions (nextProps) {
    if (nextProps.visitedStories.items.length < 3) return
    if (nextProps.visitedStories.items.length === this.props.visitedStories.items.length) return
    return this.props.dispatch(NotificationsActions.requestPermissions())
  }
}

NotificationsContainer.propTypes = {
  visitedStories: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.any
}

const mapStateToProps = (state, ownProps) => {
  return {
    visitedStories: state.StorageReducer.visitedStories
  }
}

const NotificationsContainerWithData = withQuery(NotificationsContainer)
export default connect(mapStateToProps)(NotificationsContainerWithData)
