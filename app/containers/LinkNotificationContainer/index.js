import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { InteractionManager } from 'react-native'
import { OPEN_NOTIFICATION } from '../../constants/Analytics'
import { AnalyticsActions, NavigationActions } from '../../actions/index'
import withQuery from './index.gql'

class LinkNotificationContainer extends Component {
  componentDidMount () {
    const { dispatch, payload } = this.props
    const { slug } = payload.additionalData.model
    dispatch(AnalyticsActions.trackEvent(OPEN_NOTIFICATION, slug))
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.data.loading === nextProps.data.loading) return
    this.openLink(nextProps)
  }

  render () {
    return null
  }

  openLink (props) {
    const { dispatch, data } = props
    if (data.loading || !data.link) return

    InteractionManager.runAfterInteractions(() => {
      dispatch(NavigationActions.link(data.link.slug))
    })
  }
}

LinkNotificationContainer.propTypes = {
  payload: PropTypes.shape({
    additionalData: PropTypes.shape({
      model: PropTypes.shape({
        slug: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
}

const LinkNotificationContainerWithData = withQuery(LinkNotificationContainer)
export default connect()(LinkNotificationContainerWithData)
