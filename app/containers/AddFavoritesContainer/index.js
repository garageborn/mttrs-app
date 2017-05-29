import React, { Component, PropTypes } from 'react'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import _isEqual from 'lodash/isEqual'
import withQuery from './index.gql'
import AddFavoritesHeading from '../../components/AddFavoritesHeading'
import AddFavoritesFooter from '../../components/AddFavoritesFooter'
import AddFavoritesList from '../../components/AddFavoritesList'
import { isCurrentRoute } from '../../navigators/AppNavigator'

class AddFavoritesContainer extends Component {
  constructor () {
    super()
    this.openFavoritesTimeline = this.openFavoritesTimeline.bind(this)
  }

  shouldComponentUpdate (nextProps) {
    const isCurrentRouteChanged = this.props.isCurrentRoute !== nextProps.isCurrentRoute
    if (isCurrentRouteChanged) return nextProps.isCurrentRoute

    const existsChanged = this.props.favoritePublishers.exists !== nextProps.favoritePublishers.exists
    const loadingChanged = this.props.data.loading !== nextProps.data.loading
    const publishersChanged = !_isEqual(this.props.data.publishers, nextProps.data.publishers)
    return existsChanged || loadingChanged || publishersChanged
  }

  render () {
    const { favoritePublishers } = this.props

    return (
      <ScrollView>
        <AddFavoritesHeading
          openFavoritesTimeline={this.openFavoritesTimeline}
          isComplete={favoritePublishers.exists}
        />
        {this.renderPublisherList()}
        <AddFavoritesFooter onPress={this.openFavoritesTimeline} />
      </ScrollView>
    )
  }

  renderPublisherList () {
    const { loading, publishers } = this.props.data
    if (loading) return this.renderLoading()
    return <AddFavoritesList publishers={publishers} />
  }

  renderLoading () {
    return (
      <View>
        <ActivityIndicator size='large' color='#AAA' />
      </View>
    )
  }

  openFavoritesTimeline () {
    const { navigation } = this.props
    navigation.goBack()
  }
}

AddFavoritesContainer.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    publishers: PropTypes.any
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  favoritePublishers: PropTypes.shape({
    exists: PropTypes.bool.isRequired
  }).isRequired,
  isCurrentRoute: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired
}

let mapStateToProps = (state) => {
  return {
    isCurrentRoute: isCurrentRoute(state.nav, 'addFavorites'),
    favoritePublishers: {
      exists: state.FavoritePublishersReducer.items.length > 0
    }
  }
}

const AddFavoritesContainerWithData = withQuery(AddFavoritesContainer)
export default connect(mapStateToProps)(AddFavoritesContainerWithData)
