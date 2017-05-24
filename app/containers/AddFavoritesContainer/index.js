import React, { Component, PropTypes } from 'react'
import { ActivityIndicator, ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import AddFavoritesHeading from '../../components/AddFavoritesHeading'
import AddFavoritesFooter from '../../components/AddFavoritesFooter'
import AddFavoritesList from '../../components/AddFavoritesList'
import { NavigationActions } from '../../actions/index'

class AddFavoritesContainer extends Component {
  constructor () {
    super()
    this.openFavoritesTimeline = this.openFavoritesTimeline.bind(this)
  }

  render () {
    const { favorites } = this.props

    return (
      <ScrollView>
        <AddFavoritesHeading
          openFavoritesTimeline={this.openFavoritesTimeline}
          isComplete={favorites.exists}
        />
        {this.renderPublisherList()}
        <AddFavoritesFooter
          onPress={this.openFavoritesTimeline}
        />
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
    const { dispatch } = this.props
    dispatch(NavigationActions.favoritesTimeline())
  }
}

AddFavoritesContainer.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    publishers: PropTypes.any
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  favorites: PropTypes.shape({
    exists: PropTypes.bool.isRequired
  }).isRequired
}

let mapStateToProps = (state) => {
  return {
    favorites: {
      exists: state.FavoritePublishersReducer.items.length > 0
    }
  }
}

const AddFavoritesContainerWithData = withQuery(AddFavoritesContainer)
export default connect(mapStateToProps)(AddFavoritesContainerWithData)
