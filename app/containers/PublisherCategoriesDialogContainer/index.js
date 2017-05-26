import React, { Component, PropTypes } from 'react'
import { Modal, View } from 'react-native'
import { connect } from 'react-redux'
import CategoriesDialogContainer from '../CategoriesDialogContainer'
import { NavigationActions, PublishersActions } from '../../actions/index'
import styles from '../../styles/Modal'

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
        <View style={styles.modal}>
          <CategoriesDialogContainer publisherIds={[publisher.id]} onPress={this.selectCategory} />
        </View>
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
