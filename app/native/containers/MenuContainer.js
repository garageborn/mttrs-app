import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import ButtonGroup from '../components/ButtonGroup'
import CategoryMenuContainer from './CategoryMenuContainer'
import PublisherMenuContainer from './PublisherMenuContainer'
import styles from '../styles/Menu'
import { NavigationActions } from '@exponent/ex-navigation'

const TABS = [
  { id: 'categories', label: 'Categories', component: <CategoryMenuContainer /> },
  { id: 'publishers', label: 'Publishers', component: <PublisherMenuContainer /> }
]

class MenuContainer extends Component {
  constructor(props) {
    super(props)
    this.changeCurrentTab = this.changeCurrentTab.bind(this)
  }

  changeCurrentTab(selectedIndex) {
    const { dispatch, navigation, params } = this.props
    const selectedTab = TABS[selectedIndex]

    let menuParams = Object.assign({}, params.menu, { tab: selectedTab.id })
    let newParams = Object.assign({}, params, { menu: menuParams })
    dispatch(NavigationActions.updateCurrentRouteParams(navigation.currentNavigatorUID, newParams))
  }

  render() {
    return (
      <View style={styles.menu}>
        <View style={styles.selector}>
          <ButtonGroup
            selectedBackgroundColor='#42729B'
            onPress={this.changeCurrentTab}
            selectedIndex={this.currentTabIndex}
            buttons={this.labels} />
        </View>

        <View style={styles.menuContainer}>
          { this.currentTab.component }
        </View>
      </View>
    )
  }

  get labels() {
    return TABS.map(tab => tab.label)
  }

  get currentTab() {
    const { tab } = this.props.params.menu
    return TABS.find(t => t.id === tab) || TABS[0]
  }

  get currentTabIndex() {
    return TABS.indexOf(this.currentTab)
  }
}

let mapStateToProps = (state, ownProps) => {
  return {
    navigation: state.navigation
  }
}
export default connect(mapStateToProps)(MenuContainer)
