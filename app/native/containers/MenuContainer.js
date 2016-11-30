import React, { Component } from 'react'
import { View, Text, Image, Animated, Dimensions, Button } from 'react-native'
import { connect } from 'react-redux'
import { injectIntl, defineMessages } from 'react-intl'
import ButtonGroup from '../components/ButtonGroup'
import CategoryMenuContainer from './CategoryMenuContainer'
import PublisherMenuContainer from './PublisherMenuContainer'
import NamespaceMenuContainer from './NamespaceMenuContainer'
import { MenuActions } from '../actions/index'
import styles from '../styles/Menu'

const { height } = Dimensions.get('window')

const messages = defineMessages({
  headerCategories: {
    id: 'header.categories',
    defaultMessage: 'Categories'
  },
  headerPublishers: {
    id: 'header.publishers',
    defaultMessage: 'Publishers'
  },
  headerCountries: {
    id: 'header.countries',
    defaultMessage: 'Countries'
  }
})

class MenuContainer extends Component {
  constructor(props) {
    super(props)
    const { formatMessage } = this.props.intl
    const categories = formatMessage(messages.headerCategories)
    const publishers = formatMessage(messages.headerPublishers)
    const countries = formatMessage(messages.headerCountries)
    this.changeCurrentTab = this.changeCurrentTab.bind(this)
    this.state = {
      tabs: [
        { id: 'categories', label: categories, component: <CategoryMenuContainer params={ this.props.params }/> },
        { id: 'publishers', label: publishers, component: <PublisherMenuContainer /> },
        { id: 'countries', label: countries, component: <NamespaceMenuContainer /> }
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
        <View style={styles.selector}>
          <ButtonGroup
            underlayColor={'rgba(255,255,255,.1)'}
            selectedBackgroundColor='#2672D7'
            onPress={this.changeCurrentTab}
            selectedIndex={this.currentTabIndex}
            buttons={this.labels} />
        </View>
        <View style={styles.menuContainer}>
          {this.currentTab.component}
        </View>
      </View>
    )
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

const intlMenuContainer = injectIntl(MenuContainer)
export default connect(mapStateToProps)(intlMenuContainer)
