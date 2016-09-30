import React, { Component, PropTypes } from 'react'
import Header from '../components/Header'
import { NavigationActions } from '@exponent/ex-navigation'

class CategoryHeaderContainer extends Component {
  render() {
    const { toggleMenu, category } = this.props
    return (
      <Header
        title={category.name}
        toggleMenu={toggleMenu}
        icon={require('../assets/icons/icon-world-news.png')}
        />
    )
  }
}

CategoryHeaderContainer.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  toggleMenu: PropTypes.func.isRequired
}

export default CategoryHeaderContainer
