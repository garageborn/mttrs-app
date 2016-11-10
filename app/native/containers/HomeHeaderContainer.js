import React, { Component, PropTypes } from 'react'
import { Image } from 'react-native'
import Header from '../components/Header'
import styles from '../styles/Header'
import { NavigationActions } from '@exponent/ex-navigation'
import _isNil from 'lodash/isNil'

class HomeHeaderContainer extends Component {
  get icon() {
    return <Image style={styles.icon} source={require('../assets/icons/icon-top-stories.png')} />
  }

  render() {
    const { toggleMenu, category } = this.props
    let title = 'Top Stories'

    if (category) { title = category.name }

    return (
      <Header
        toggleMenu={toggleMenu}
        title={title}
        icon={this.icon}
        />
    )
  }
}

HomeHeaderContainer.propTypes = {
  toggleMenu: PropTypes.func.isRequired
}

export default HomeHeaderContainer
