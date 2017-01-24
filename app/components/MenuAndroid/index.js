import React, { Component, PropTypes } from 'react'
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view'
import { injectIntl, defineMessages } from 'react-intl'
import PublisherMenuContainer from '../../containers/PublisherMenuContainer'
import CategoryMenuContainer from '../../containers/CategoryMenuContainer'
import styles from './styles'

const messages = defineMessages({
  headerCategories: {
    id: 'header.categories',
    defaultMessage: 'Categories'
  },
  headerPublishers: {
    id: 'header.publishers',
    defaultMessage: 'Publishers'
  }
})

class MenuAndroid extends Component {
  constructor (props) {
    super(props)
    console.log(props)
    const { formatMessage } = props.intl
    const categories = formatMessage(messages.headerCategories)
    const publishers = formatMessage(messages.headerPublishers)
    this.handleChangeTab = this.handleChangeTab.bind(this)
    this.state = {
      index: 0,
      routes: [
        { key: '1', title: categories },
        { key: '2', title: publishers }
      ]
    }
  }

  handleChangeTab (index) {
    this.setState({ index })
  }

  renderHeader (props) {
    return (
      <TabBarTop
        {...props}
        style={styles.tabBar}
      />
    )
  }

  renderScene ({route}) {
    switch (route.key) {
      case '1':
        return <CategoryMenuContainer />
      case '2':
        return <PublisherMenuContainer />
      default:
        return null
    }
  }

  render () {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this.renderScene}
        renderHeader={this.renderHeader}
        onRequestChangeTab={this.handleChangeTab}
      />
    )
  }
}

MenuAndroid.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  params: PropTypes.object.isRequired
}

const intlMenuAndroid = injectIntl(MenuAndroid)
export default intlMenuAndroid
