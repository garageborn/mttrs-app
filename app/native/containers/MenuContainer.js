import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import ButtonGroup from '../components/ButtonGroup'
import CategoryMenuContainer from './CategoryMenuContainer'
import PublisherMenuContainer from './PublisherMenuContainer'
import styles from '../styles/Menu'
import { NavigationActions } from '@exponent/ex-navigation'
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
    const { dispatch, navigation, params } = this.props
    const selectedTab = TABS[selectedIndex]

    let menuParams = Object.assign({}, params.menu, { tab: selectedTab.id })
    let newParams = Object.assign({}, params, { menu: menuParams })
    dispatch(NavigationActions.updateCurrentRouteParams(navigation.currentNavigatorUID, newParams))
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

let mapStateToProps = (state) => {
  return {
    navigation: state.navigation
  }
}
export default connect(mapStateToProps)(MenuContainer)
