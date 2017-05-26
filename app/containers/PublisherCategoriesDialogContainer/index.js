import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import CategoriesDialogContainer from '../CategoriesDialogContainer'
import { PublishersActions } from '../../actions/index'

class PublisherCategoriesDialogContainer extends Component {
  constructor () {
    super()
    this.selectCategory = this.selectCategory.bind(this)
  }

  render () {
    const { publisher } = this.props
    return <CategoriesDialogContainer publisherIds={[publisher.id]} onPress={this.selectCategory} />
  }

  selectCategory (category) {
    const { dispatch, publisher } = this.props
    console.log('selectCategory', category)
    dispatch(PublishersActions.selectCategory(publisher, category))
  }
}

PublisherCategoriesDialogContainer.propTypes = {
  publisher: PropTypes.shape({
    id: PropTypes.any.isRequired
  }).isRequired
}

export default connect()(PublisherCategoriesDialogContainer)
