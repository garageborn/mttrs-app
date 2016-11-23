import React, { Component, PropTypes } from 'react'
import { Image } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import { NavigationActions } from '@exponent/ex-navigation'
import Header from '../components/Header'
import styles from '../styles/Header'

const messages = defineMessages({
  headerTitle: {
    id: 'header.title',
    defaultMessage: 'Top Stories'
  }
})

class HomeHeaderContainer extends Component {
  get icon() {
    return <Image style={styles.icon} source={require('../assets/icons/icon-top-stories.png')} />
  }

  render() {
    const { formatMessage } = this.props.intl
    const { toggleMenu, category } = this.props
    let title = formatMessage(messages.headerTitle)

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

export default injectIntl(HomeHeaderContainer)
