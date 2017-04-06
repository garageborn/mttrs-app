import React, { Component, PropTypes } from 'react'
import { InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import { NavigationActions } from '../../actions/index'

class CategoryNotificationContainer extends Component {
  componentWillReceiveProps (nextProps) {
    if (this.props.data.loading === nextProps.data.loading) return
    this.openCategory(nextProps)
  }

  render () {
    return null
  }

  openCategory (props) {
    const { dispatch, model, data } = props
    if (data.loading || !data.category) return

    InteractionManager.runAfterInteractions(() => {
      return dispatch(NavigationActions.selectCategory(data.category))
    })
  }
}

CategoryNotificationContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  model: PropTypes.shape({
    slug: PropTypes.string.isRequired
  }).isRequired
}

const CategoryNotificationContainerWithData = withQuery(CategoryNotificationContainer)
export default connect()(CategoryNotificationContainerWithData)
