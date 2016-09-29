import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Header from '../components/Header'
import Router from '../config/Router'
import { NavigationActions } from '@exponent/ex-navigation'

class CategoryHeaderContainer extends Component {
  render() {
    const { toggleMenu, params } = this.props
    const { name } = params.section.model
    return (
      <Header
        title={name}
        toggleMenu={toggleMenu}
        icon={require('../assets/icons/icon-world-news.png')}
        />
    )
  }
}

CategoryHeaderContainer.propTypes = {
  action: PropTypes.string
}

export default CategoryHeaderContainer
