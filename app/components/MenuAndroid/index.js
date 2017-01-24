import React, { Component } from 'react'
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view'
import PublisherMenuContainer from '../../containers/PublisherMenuContainer'
import CategoryMenuContainer from '../../containers/CategoryMenuContainer'
import styles from './styles'

class MenuAndroid extends Component {
  constructor () {
    super()
    this.handleChangeTab = this.handleChangeTab.bind(this)
    this.state = {
      index: 0,
      routes: [
        { key: '1', title: 'Categories' },
        { key: '2', title: 'Publishers' }
      ]
    }
  }

  handleChangeTab (index) {
    this.setState({ index })
  };

  renderHeader (props) {
    return (
      <TabBarTop
        {...props}
        style={styles.tabBar}
      />
    )
  }

  renderScene ({ route }) {
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

export default MenuAndroid
