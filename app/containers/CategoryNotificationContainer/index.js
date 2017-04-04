import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from '../../actions/index'

class CategoryNotificationContainer extends Component {
  componentDidMount () {
    this.handleResult()
  }

  render () {
    return null
  }

  handleResult () {
    let { model, dispatch } = this.props
    return dispatch(NavigationActions.selectCategory(model))
  }
}

CategoryNotificationContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  model: PropTypes.object.isRequired
}

export default connect()(CategoryNotificationContainer)
