import React, { Component } from 'react'
import { View, Text, Image, Animated, Dimensions, Button } from 'react-native'
import { connect } from 'react-redux'
import ButtonGroup from '../components/ButtonGroup'
import CategoryMenuContainer from './CategoryMenuContainer'
import PublisherMenuContainer from './PublisherMenuContainer'
import styles from '../styles/Menu'
import { TimelineActions, NavigationActions, MenuActions } from '../actions/index'
import Tenant from '../../common/utils/Tenant'

const { height } = Dimensions.get('window')

class MenuContainer extends Component {
  constructor(props) {
    super(props)
    this.changeCurrentTab = this.changeCurrentTab.bind(this)
    this.onPressSwitchTenant = this.onPressSwitchTenant.bind(this)
    this.state = {
      tabs: [
        { id: 'categories', label: 'Categories', component: <CategoryMenuContainer params={ this.props.params }/> },
        { id: 'publishers', label: 'Publishers', component: <PublisherMenuContainer /> }
      ]
    }
  }

  changeCurrentTab(selectedIndex) {
    const selectedTab = this.state.tabs[selectedIndex]
    this.props.dispatch(MenuActions.changeMenuTab(selectedTab.id))
  }

  render() {
    return (
      <View style={styles.menu}>
        <Button
          onPress={this.onPressSwitchTenant}
          title="Switch Tenant"
        />
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
      </View>
    )
  }

  onPressSwitchTenant() {
    Tenant.current = 'mttrs_br'
    this.props.dispatch(TimelineActions.switchTenant(Tenant.current))
    this.props.dispatch(NavigationActions.home())
    this.props.dispatch(MenuActions.retractMenu())
  }

  get labels() {
    return this.state.tabs.map(tab => tab.label)
  }

  get currentTabIndex() {
    return this.state.tabs.indexOf(this.currentTab)
  }

  get currentTab() {
    return this.state.tabs.find((tab) => tab.id === this.props.uiReducer.menu.currentTab)
  }
}

function mapStateToProps(state) {
  return { uiReducer: state.uiReducer }
}

export default connect(mapStateToProps)(MenuContainer)
