import React, { Component, PropTypes } from 'react'
import Header from '../components/Header'
import { NavigationActions } from '@exponent/ex-navigation'

class PublisherHeaderContainer extends Component {
  render() {
    const { toggleMenu, publisher } = this.props
    return (
      <Header
        toggleMenu={toggleMenu}
        title={publisher.name}
        icon={require('../assets/icons/icon-top-stories.png')}
        />
    )
  }
}

PublisherHeaderContainer.propTypes = {
  publisher: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  toggleMenu: PropTypes.func.isRequired
}
export default PublisherHeaderContainer
