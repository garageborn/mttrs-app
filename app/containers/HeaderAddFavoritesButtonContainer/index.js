import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import HeaderAddFavoritesButton from '../../components/HeaderAddFavoritesButton'
import { NavigationActions } from '../../actions/index'

class HeaderAddFavoritesButtonContainer extends Component {
  constructor () {
    super()
    this.openFavoriteCategoriesDialog = this.openFavoriteCategoriesDialog.bind(this)
  }

  render () {
    return <HeaderAddFavoritesButton onPress={this.openFavoriteCategoriesDialog} />
  }

  openFavoriteCategoriesDialog () {
    const { dispatch } = this.props
    dispatch(NavigationActions.addFavorites())
  }
}

HeaderAddFavoritesButtonContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(HeaderAddFavoritesButtonContainer)
