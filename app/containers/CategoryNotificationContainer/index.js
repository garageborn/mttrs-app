import React, { Component, PropTypes } from 'react'
import { InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import { OPEN_NOTIFICATION } from '../../constants/Analytics'
import { AnalyticsActions, NavigationActions } from '../../actions/index'

class CategoryNotificationContainer extends Component {
  componentDidMount () {
    const { dispatch, payload } = this.props
    const { slug } = payload.additionalData.model
    dispatch(AnalyticsActions.trackEvent(OPEN_NOTIFICATION, slug))
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.data.loading === nextProps.data.loading) return
    this.openCategory(nextProps)
  }

  render () {
    return null
  }

  openCategory (props) {
    const { dispatch, data } = props
    if (data.loading || !data.category) return

    InteractionManager.runAfterInteractions(() => {
      return dispatch(NavigationActions.selectCategory(data.category))
    })
  }
}

CategoryNotificationContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  payload: PropTypes.shape({
    additionalData: PropTypes.shape({
      model: PropTypes.shape({
        slug: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
}

const CategoryNotificationContainerWithData = withQuery(CategoryNotificationContainer)
export default connect()(CategoryNotificationContainerWithData)
