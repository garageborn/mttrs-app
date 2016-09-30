import React, { Component, PropTypes } from 'react'
import Header from '../components/Header'
import { NavigationActions } from '@exponent/ex-navigation'

class HomeHeaderContainer extends Component {
  render() {
    const { toggleMenu } = this.props
    return (
      <Header
        toggleMenu={toggleMenu}
        title='Top Stories'
        icon={require('../assets/icons/icon-top-stories.png')}
        />
    )
  }
}

HomeHeaderContainer.propTypes = {
  toggleMenu: PropTypes.func.isRequired
}

export default HomeHeaderContainer
