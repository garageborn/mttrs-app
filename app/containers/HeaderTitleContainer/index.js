import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import _result from 'lodash/result'
import HeaderTitle from '../../components/HeaderTitle'

class HeaderTitleContainer extends Component {
  render () {
    return <HeaderTitle {...this.props} title={this.title} />
  }

  get title () {
    if (this.props.type === 'favorites') return this.favoritesTitle
    return this.publishersTitle
  }

  get favoritesTitle () {
    const { category, screenProps } = this.props
    if (!_result(category, 'name')) return screenProps.intl.formatMessage({id: 'header.favorites'})
    return category.name
  }

  get publishersTitle () {
    const { publisher } = this.props.navigation.state.params
    return publisher.name
  }
}

const mapStateToProps = state => {
  return {
    category: state.FavoritesReducer.category
  }
}

HeaderTitleContainer.propTypes = {
  type: PropTypes.string.isRequired,
  category: PropTypes.object,
  screenProps: PropTypes.object,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        publisher: PropTypes.object
      })
    }).isRequired
  }).isRequired
}

export default connect(mapStateToProps)(HeaderTitleContainer)
