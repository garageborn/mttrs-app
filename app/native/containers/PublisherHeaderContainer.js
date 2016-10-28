import React, { Component, PropTypes } from 'react'
import Header from '../components/Header'
import PublisherLogo from '../components/PublisherLogo'
import { NavigationActions } from '@exponent/ex-navigation'

class PublisherHeaderContainer extends Component {
  get icon() {
    return <PublisherLogo source={require('../assets/icons/icon-publisher-mock.png')} />
  }

  render() {
    const { toggleMenu, publisher } = this.props
    return (
      <Header
        toggleMenu={toggleMenu}
        title={publisher.name}
        icon={this.icon}
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
