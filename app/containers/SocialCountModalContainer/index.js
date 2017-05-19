import React, { Component, PropTypes } from 'react'
import { View, Modal, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import CloseButton from '../../components/CloseButton'
import SocialCountModal from '../../components/SocialCountModal'
import { NavigationActions } from '../../actions/index'
import styles from '../../styles/StoryLinks'

class SocialCountModalContainer extends Component {
  constructor (props) {
    super(props)
    this.close = this.close.bind(this)
  }

  close () {
    this.props.dispatch(NavigationActions.closeModal())
  }

  render () {
    return (
      <Modal animationType={'slide'} transparent visible onRequestClose={this.close} >
        <View style={styles.modal}>
          {this.renderStoryLinks()}
          <CloseButton onPress={this.close} />
        </View>
      </Modal>
    )
  }

  renderLoading () {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size='large' color='#FFF' />
      </View>
    )
  }

  renderStoryLinks () {
    if (this.props.data.loading || !this.props.data.story) return this.renderLoading()
    return (
      <SocialCountModal
        story={this.props.data.story}
      />
    )
  }
}

SocialCountModalContainer.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    story: PropTypes.object
  }),
  dispatch: PropTypes.func
}

const SocialCountModalContainerWithData = withQuery(SocialCountModalContainer)
export default connect()(SocialCountModalContainerWithData)
