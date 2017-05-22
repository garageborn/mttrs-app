import React, { Component, PropTypes } from 'react'
import { View, Modal, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import StoryLinks from '../../components/StoryLinks'
import CloseButton from '../../components/CloseButton'
import { NavigationActions } from '../../actions/index'
import styles from '../../styles/Modal'

class StoryLinksModalContainer extends Component {
  constructor (props) {
    super(props)
    this.close = this.close.bind(this)
  }

  close () {
    this.props.dispatch(NavigationActions.closeModal())
  }

  render () {
    return (
      <Modal animationType={'slide'} transparent visible onRequestClose={this.close}>
        <View style={styles.modal}>
          { this.renderStoryLinks() }
          <CloseButton onPress={this.close} />
        </View>
      </Modal>
    )
  }

  renderStoryLinks () {
    if (this.props.data.loading || !this.props.data.story) return this.renderLoading()

    return (
      <StoryLinks
        story={this.props.data.story}
        openLink={this.openLink}
        openPublisher={this.openPublisher}
      />
    )
  }

  renderLoading () {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size='large' color='#FFF' />
      </View>
    )
  }
}

StoryLinksModalContainer.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    story: PropTypes.object
  }),
  story: PropTypes.shape({
    id: PropTypes.any.isRequired
  }).isRequired,
  dispatch: PropTypes.func
}

const StoryLinksModalContainerWithData = withQuery(StoryLinksModalContainer)
export default connect()(StoryLinksModalContainerWithData)
