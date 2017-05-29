import React, { Component, PropTypes } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import FavoritePublishersList from '../../components/FavoritePublishersList'
import { NavigationActions } from '../../actions/index'

class FavoritePublishersListContainer extends Component {
  constructor () {
    super()
    this.openPublisher = this.openPublisher.bind(this)
  }

  shouldComponentUpdate (nextProps) {
    return this.props.data.loading !== nextProps.data.loading
  }

  render () {
    const { loading, publishers } = this.props.data
    if (loading) return this.renderLoading()
    return <FavoritePublishersList publishers={publishers} openPublisher={this.openPublisher} />
  }

  renderLoading () {
    return (
      <View>
        <ActivityIndicator size='large' color='#AAA' />
      </View>
    )
  }

  openPublisher (publisher) {
    const { dispatch } = this.props
    dispatch(NavigationActions.publisher(publisher))
  }
}

FavoritePublishersListContainer.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    publishers: PropTypes.any
  }).isRequired,
  dispatch: PropTypes.func.isRequired
}

const FavoritePublishersListContainerWithData = withQuery(FavoritePublishersListContainer)
export default connect()(FavoritePublishersListContainerWithData)
