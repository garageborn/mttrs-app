import React, { Component } from 'react'
import { connect } from 'react-redux'
import HeaderTitle from '../../components/HeaderTitle'

class HeaderTitleContainer extends Component {
  render () {
    return <HeaderTitle title={this.title} />
  }

  get title () {
    const { categoryId, screenProps } = this.props
    if (!categoryId) return screenProps.intl.formatMessage({id: 'header.favorites'})
    return categoryId
  }
}

const mapStateToProps = state => {
  return {
    categoryId: state.FavoritesReducer.categoryId
  }
}

export default connect(mapStateToProps)(HeaderTitleContainer)
