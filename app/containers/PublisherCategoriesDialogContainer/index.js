import React, { Component, PropTypes } from 'react'
import { Modal } from 'react-native'
import { connect } from 'react-redux'
import CategoriesDialogContainer from '../CategoriesDialogContainer'
import Dialog from '../../components/Dialog'
import { NavigationActions, PublishersActions } from '../../actions/index'

class PublisherCategoriesDialogContainer extends Component {
  constructor () {
    super()
    this.close = this.close.bind(this)
    this.selectCategory = this.selectCategory.bind(this)
  }

  render () {
    const { publisher } = this.props
    return (
      <Modal transparent visible onRequestClose={this.close}>
        <Dialog closeDialog={this.close} >
          <CategoriesDialogContainer type='publisher' publisherIds={[publisher.id]} onPress={this.selectCategory} />
        </Dialog>
      </Modal>
    )
  }

  selectCategory (category) {
    const { dispatch, publisher } = this.props
    this.close()
    dispatch(PublishersActions.selectCategory(publisher, category))
  }

  close () {
    const { dispatch } = this.props
    dispatch(NavigationActions.closeModal())
  }
}

PublisherCategoriesDialogContainer.propTypes = {
  publisher: PropTypes.shape({
    id: PropTypes.any.isRequired
  }).isRequired
}

export default connect()(PublisherCategoriesDialogContainer)
