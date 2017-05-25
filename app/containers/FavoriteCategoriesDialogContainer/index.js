import React, { Component, PropTypes } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { connect } from 'react-redux'
import { injectIntl, defineMessages } from 'react-intl'
import _result from 'lodash/result'
import withQuery from './index.gql'
import FavoriteCategoryButton from '../../components/FavoriteCategoryButton'
import { FavoritesActions, FavoritePublishersActions } from '../../actions/index'

const messages = defineMessages({
  allCategories: { id: 'favoriteCategories.allCategories' }
})

class FavoriteCategoriesDialogContainer extends Component {
  constructor () {
    super()
    this.selectCategory = this.selectCategory.bind(this)
  }

  componentWillMount () {
    this.props.dispatch(FavoritePublishersActions.getPublishers())
  }

  render () {
    return (
      <View>
        {this.renderAllCategories()}
        {this.renderCategories()}
      </View>
    )
  }

  renderAllCategories () {
    const { formatMessage } = this.props.intl
    const category = { name: formatMessage(messages.allCategories) }
    return this.renderCategory(category)
  }

  renderCategories () {
    const { data, favoritePublishers } = this.props
    const loading = _result(data, 'loading')
    const categories = _result(data, 'categories')
    if (!favoritePublishers.isLoaded || loading) return this.renderLoading()
    if (!categories) return
    return categories.map((category) => this.renderCategory(category))
  }

  renderCategory (category) {
    return (
      <FavoriteCategoryButton
        category={category}
        onPress={this.selectCategory}
        key={category.id}
      />
    )
  }

  renderLoading () {
    return (
      <View>
        <ActivityIndicator size='large' color='#AAA' />
      </View>
    )
  }

  selectCategory (category) {
    const { dispatch } = this.props
    dispatch(FavoritesActions.selectCategory(category))
  }
}

FavoriteCategoriesDialogContainer.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  favoritePublishers: PropTypes.shape({
    isLoaded: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired
  }).isRequired,
  data: PropTypes.shape({
    categories: PropTypes.array
  })
}

let mapStateToProps = (state) => {
  return {
    favoritePublishers: {
      isLoaded: state.FavoritePublishersReducer.isLoaded,
      items: state.FavoritePublishersReducer.items
    }
  }
}

const IntlFavoriteCategoriesDialogContainer = injectIntl(FavoriteCategoriesDialogContainer)
const FavoriteCategoriesDialogContainerWithData = withQuery(IntlFavoriteCategoriesDialogContainer)
export default connect(mapStateToProps)(FavoriteCategoriesDialogContainerWithData)