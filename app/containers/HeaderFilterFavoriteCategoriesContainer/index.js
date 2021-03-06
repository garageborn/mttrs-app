import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FavoriteCategoriesDialogContainer from '../../containers/FavoriteCategoriesDialogContainer'
import HeaderFilterButton from '../../components/HeaderFilterButton'
import { NavigationActions } from '../../actions/index'

class HeaderFilterFavoriteCategoriesContainer extends Component {
  constructor () {
    super()
    this.openFavoriteCategoriesDialog = this.openFavoriteCategoriesDialog.bind(this)
  }

  render () {
    return <HeaderFilterButton onPress={this.openFavoriteCategoriesDialog} />
  }

  openFavoriteCategoriesDialog () {
    const { dispatch } = this.props
    const content = <FavoriteCategoriesDialogContainer />
    dispatch(NavigationActions.favoriteCategoriesDialog(content))
  }
}

HeaderFilterFavoriteCategoriesContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(HeaderFilterFavoriteCategoriesContainer)
