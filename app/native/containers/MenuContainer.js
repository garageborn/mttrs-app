import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import ButtonGroup from '../components/ButtonGroup'
import CategoryMenuContainer from './CategoryMenuContainer'
import MenuPublishers from '../components/MenuPublishers'
import styles from '../styles/Menu'
import { NavigationActions } from '@exponent/ex-navigation'

const TABS = [
  { id: 'categories', label: 'Categories', component: <CategoryMenuContainer /> },
  { id: 'publishers', label: 'Publishers', component: <MenuPublishers /> }
]

class MenuContainer extends Component {
  constructor(props) {
    super(props)
    this.changeCurrentTab = this.changeCurrentTab.bind(this)
  }

  changeCurrentTab(selectedIndex) {
    // const { dispatch, navigation, route } = this.props
    // const selectedTab = TABS[selectedIndex]

    // let params = Object.assign({}, route.params, { tab: selectedTab.id })
    // dispatch(NavigationActions.updateCurrentRouteParams(navigation.currentNavigatorUID, params))
  }

  render() {
    console.log('render menucontainer')
    const buttons = TABS.map(tab => tab.label)
    // const currentTab = TABS.find(tab => tab.id === this.props.route.params.tab)
    const currentTab = TABS[0]

    return (
      <View style={styles.menu}>
        <View style={styles.selector}>
          <ButtonGroup
            selectedBackgroundColor='#42729B'
            onPress={this.changeCurrentTab}
            selectedIndex={TABS.indexOf(currentTab)}
            buttons={buttons} />
        </View>

        <View style={styles.menuContainer}>
          { currentTab.component }
        </View>
      </View>
    )
  }
}

// let mapStateToProps = (state, ownProps) => {
//   return {
//     navigation: state.navigation,
//     publisherSlug: ownProps.publisherSlug
//   }
// }
// export default connect(mapStateToProps)(MenuContainer)
export default MenuContainer
