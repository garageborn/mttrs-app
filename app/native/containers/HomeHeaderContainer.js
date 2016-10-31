import React, { Component, PropTypes } from 'react'
import { Image } from 'react-native'
import Header from '../components/Header'
import styles from '../styles/Header'
import { NavigationActions } from '@exponent/ex-navigation'

class HomeHeaderContainer extends Component {
  get icon() {
    return <Image style={styles.icon} source={require('../assets/icons/icon-top-stories.png')} />
  }

  render() {
    const { toggleMenu } = this.props
    return (
      <Header
        toggleMenu={toggleMenu}
        title='Top Stories'
        icon={this.icon}
        />
    )
  }
}

HomeHeaderContainer.propTypes = {
  toggleMenu: PropTypes.func.isRequired
}

export default HomeHeaderContainer
