import React, { Component, PropTypes } from 'react'
import { View, Modal, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import CloseButton from '../../components/CloseButton'
import Dialog from '../../components/Dialog'
import StoryDialog from '../../components/StoryDialog'
import { FavoritePublishersActions, NavigationActions } from '../../actions/index'
import styles from '../../styles/Modal'

class StoryDialogModalContainer extends Component {
  constructor (props) {
    super(props)
    this.close = this.close.bind(this)
  }

  close () {
    this.props.dispatch(NavigationActions.closeModal())
  }

  componentWillMount () {
    this.props.dispatch(FavoritePublishersActions.getPublishers())
  }

  render () {
    return (
      <Modal animationType={'slide'} transparent visible onRequestClose={this.close}>
        <Dialog underlayColor={'rgba(0, 0, 0, 0.8)'} closeDialog={this.close} >
          {this.renderActions()}
        </Dialog>
        <CloseButton onPress={this.close} />
      </Modal>
    )
  }

  renderActions () {
    const { favorites, story } = this.props
    if (!favorites.isLoaded) return this.renderLoading()
    return <StoryDialog story={story} />
  }

  renderLoading () {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size='large' color='#FFF' />
      </View>
    )
  }
}

StoryDialogModalContainer.propTypes = {
  favorites: PropTypes.shape({
    isLoaded: PropTypes.bool.isRequired
  }),
  story: PropTypes.shape({
    main_link: PropTypes.shape({
      publisher: PropTypes.shape({
        id: PropTypes.any.isRequired,
        name: PropTypes.string.isRequired,
        display_name: PropTypes.string
      }).isRequired
    }).isRequired
  }).isRequired,
  dispatch: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  return {
    favorites: {
      isLoaded: state.FavoritePublishersReducer.isLoaded
    }
  }
}

export default connect(mapStateToProps)(StoryDialogModalContainer)
