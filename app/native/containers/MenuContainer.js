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

class MenuContainer extends Component {
  constructor(props) {
    super(props)
    this.changeCurrentTab = this.changeCurrentTab.bind(this)
    this.state = {
      tabs: [
        { id: 'categories', label: 'Categories', component: <CategoryMenuContainer params={ this.props.params }/> },
        { id: 'publishers', label: 'Publishers', component: <PublisherMenuContainer /> }
      ]
    }
  }

  changeCurrentTab(selectedIndex) {
    const selectedTab = this.state.tabs[selectedIndex]
    this.props.dispatch(NavigationActions.changeMenuTab(selectedTab.id))
  }

  render() {
    return (
      <AnimateView animation='bounceInDown' style={styles.menu}>
        <View style={styles.selector}>
          <ButtonGroup
            underlayColor={'rgba(255,255,255,.1)'}
            selectedBackgroundColor='#2672D7'
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
    return this.state.tabs.map(tab => tab.label)
  }

  get currentTab() {
    const { tab } = this.props.params.menu
    return this.state.tabs.find(t => t.id === tab) || this.state.tabs[0]
  }

  get currentTabIndex() {
    return this.state.tabs.indexOf(this.currentTab)
  }
}

export default connect()(MenuContainer)
