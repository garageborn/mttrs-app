import React, { Component } from 'react'
import { connect } from 'react-redux'
import _result from 'lodash/result'
import HeaderTitle from '../../components/HeaderTitle'

class HeaderTitleContainer extends Component {
  render () {
    return <HeaderTitle title={this.title} />
  }

  get title () {
    const { category, screenProps } = this.props
    if (!_result(category, 'name')) return screenProps.intl.formatMessage({id: 'header.favorites'})
    return category.name
  }
}

const mapStateToProps = state => {
  return {
    category: state.FavoritesReducer.category
  }
}

export default connect(mapStateToProps)(HeaderTitleContainer)
