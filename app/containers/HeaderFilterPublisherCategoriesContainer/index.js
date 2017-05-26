import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import PublisherCategoriesDialogContainer from '../../containers/PublisherCategoriesDialogContainer'
import HeaderFilterButton from '../../components/HeaderFilterButton'
import { NavigationActions } from '../../actions/index'

class HeaderFilterPublisherCategoriesContainer extends Component {
  constructor () {
    super()
    this.openPublisherCategoriesDialog = this.openPublisherCategoriesDialog.bind(this)
  }

  render () {
    return <HeaderFilterButton onPress={this.openPublisherCategoriesDialog} />
  }

  openPublisherCategoriesDialog () {
    const { publisher, dispatch } = this.props
    const content = <PublisherCategoriesDialogContainer publisher={publisher} />
    dispatch(NavigationActions.publisherCategoriesDialog(publisher, content))
  }
}

HeaderFilterPublisherCategoriesContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  publisher: PropTypes.shape({
    id: PropTypes.any.isRequired
  }).isRequired
}

export default connect()(HeaderFilterPublisherCategoriesContainer)
