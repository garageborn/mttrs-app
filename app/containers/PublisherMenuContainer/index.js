import React, { Component, PropTypes } from 'react'
import { InteractionManager } from 'react-native'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import PublisherMenu from '../../components/PublisherMenu'
import { NavigationActions, MenuActions } from '../../actions/index'

class PublisherMenuContainer extends Component {
  constructor () {
    super()

    this.openPublisher = this.openPublisher.bind(this)
  }

  render () {
    return <PublisherMenu data={this.props.data} openPublisher={this.openPublisher} />
  }

  openPublisher (publisher) {
    this.props.dispatch(MenuActions.closeMenu())
    InteractionManager.runAfterInteractions(() => {
      this.props.dispatch(NavigationActions.selectPublisher(publisher))
    })
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    StorageReducer: state.StorageReducer
  }
}

PublisherMenuContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const PublisherMenuContainerWithData = withQuery(PublisherMenuContainer)
export default connect(mapStateToProps)(PublisherMenuContainerWithData)
