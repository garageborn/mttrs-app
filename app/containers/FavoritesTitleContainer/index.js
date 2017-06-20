import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import _result from 'lodash/result'
import HeaderTitle from '../../components/HeaderTitle'

const FavoritesTitleContainer = (props) => {
  const getTitle = () => {
    const { category, screenProps } = props
    if (!_result(category, 'name')) return screenProps.intl.formatMessage({ id: 'header.favorites' })
    return category.name
  }

  return <HeaderTitle {...props} title={getTitle()} />
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
