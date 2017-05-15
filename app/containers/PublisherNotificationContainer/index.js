import React, { Component, PropTypes } from 'react'
import { InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import { NavigationActions } from '../../actions/index'

class PublisherNotificationContainer extends Component {
  componentDidMount () {
    const { dispatch, payload } = this.props
    const { slug } = payload.additionalData.model
    dispatch(AnalyticsActions.trackEvent(OPEN_NOTIFICATION, slug))
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.data.loading === nextProps.data.loading) return
    this.openPublisher(nextProps)
  }

  render () {
    return null
  }

  openPublisher (props) {
    const { dispatch, data } = props
    if (data.loading || !data.publisher) return

    InteractionManager.runAfterInteractions(() => {
      return dispatch(NavigationActions.selectPublisher(data.publisher))
    })
  }
}

PublisherNotificationContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  payload: PropTypes.shape({
    additionalData: PropTypes.shape({
      model: PropTypes.shape({
        slug: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
}

const PublisherNotificationContainerWithData = withQuery(PublisherNotificationContainer)
export default connect()(PublisherNotificationContainerWithData)
