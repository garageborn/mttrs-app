import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _result from 'lodash/result'
import HeaderTitle from '../../components/HeaderTitle'

class FavoritesTitleContainer extends Component {
  render () {
    return <HeaderTitle {...this.props} title={this.title} />
  }

  get title () {
    const { category, screenProps } = this.props
    if (!_result(category, 'name')) return screenProps.intl.formatMessage({id: 'header.favorites'})
    return category.name
  }
}

const mapStateToProps = state => {
  return {
    category: state.FavoritesReducer.selectedCategory
  }
}

FavoritesTitleContainer.propTypes = {
  category: PropTypes.object,
  screenProps: PropTypes.object
}

export default connect(mapStateToProps)(FavoritesTitleContainer)
