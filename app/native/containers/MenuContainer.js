import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import ButtonGroup from '../components/ButtonGroup'
import CategoryMenuContainer from './CategoryMenuContainer'
import PublisherMenuContainer from './PublisherMenuContainer'
import styles from '../styles/Menu'
import { NavigationActions } from '../actions/index'
import { createAnimatableComponent } from 'react-native-animatable'

const AnimateView = createAnimatableComponent(View)

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
    const selectedTab = TABS[selectedIndex]
    this.props.dispatch(NavigationActions.changeMenuTab(selectedTab.id))
  }

  render() {
    return (
      <AnimateView animation='bounceInDown' style={styles.menu}>
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
      </AnimateView>
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

export default connect()(MenuContainer)
