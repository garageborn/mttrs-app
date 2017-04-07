import React, { Component, PropTypes } from 'react'
import { InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import { NavigationActions } from '../../actions/index'

class PublisherNotificationContainer extends Component {
  componentWillReceiveProps (nextProps) {
    if (this.props.data.loading === nextProps.data.loading) return
    this.openPublisher(nextProps)
  }

  render () {
    return null
  }

  openPublisher (props) {
    const { dispatch, model, data } = props
    if (data.loading || !data.publisher) return

    InteractionManager.runAfterInteractions(() => {
      return dispatch(NavigationActions.selectPublisher(data.publisher))
    })
  }
}

PublisherNotificationContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  model: PropTypes.shape({
    slug: PropTypes.string.isRequired
  }).isRequired
}

const PublisherNotificationContainerWithData = withQuery(PublisherNotificationContainer)
export default connect()(PublisherNotificationContainerWithData)
