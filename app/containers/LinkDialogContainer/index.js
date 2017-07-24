import React, { Component, PropTypes } from 'react'
import { View, ActivityIndicator, Modal } from 'react-native'
import { connect } from 'react-redux'
import Dialog from '../../components/Dialog'
import StoryDialog from '../../components/StoryDialog'
import { FavoritePublishersActions, NavigationActions } from '../../actions/index'
import styles from '../../styles/Modal'

class LinkDialogContainer extends Component {
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
      <Modal transparent visible onRequestClose={this.close}>
        <Dialog coordinates={{top: 0, right: 0}} closeDialog={this.close}>
          {this.renderActions()}
        </Dialog>
      </Modal>
    )
  }

  renderActions () {
    const { favorites, link } = this.props
    if (!favorites.isLoaded) return null
    return <StoryDialog type='untied' link={link} />
  }
}

LinkDialogContainer.propTypes = {
  favorites: PropTypes.shape({
    isLoaded: PropTypes.bool.isRequired
  }),
  link: PropTypes.shape({
    publisher: PropTypes.shape({
      id: PropTypes.any.isRequired,
      name: PropTypes.string.isRequired,
      display_name: PropTypes.string
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

export default connect(mapStateToProps)(LinkDialogContainer)
