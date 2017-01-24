import React, { PropTypes, Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import ButtonGroup from '../../components/ButtonGroup'
import styles from './styles'
import { injectIntl, defineMessages } from 'react-intl'
import CategoryMenuContainer from '../../containers/CategoryMenuContainer'
import PublisherMenuContainer from '../../containers/PublisherMenuContainer'
import { MenuActions } from '../../actions'

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

class MenuIOS extends Component {
  constructor (props) {
    super(props)
    const { formatMessage } = this.props.intl
    const categories = formatMessage(messages.headerCategories)
    const publishers = formatMessage(messages.headerPublishers)
    this.changeCurrentTab = this.changeCurrentTab.bind(this)
    this.state = {
      tabs: [
        { id: 'categories', label: categories, component: <CategoryMenuContainer params={this.props.params} /> },
        { id: 'publishers', label: publishers, component: <PublisherMenuContainer /> }
      ]
    }
  }

  changeCurrentTab (selectedIndex) {
    const selectedTab = this.state.tabs[selectedIndex]
    this.props.dispatch(MenuActions.changeMenuTab(selectedTab.id))
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <View style={styles.selector}>
          <ButtonGroup
            underlayColor={'rgba(255,255,255,.1)'}
            selectedBackgroundColor='#F1F1F1'
            onPress={this.changeCurrentTab.bind(this)}
            selectedIndex={this.currentTabIndex}
            buttons={this.labels}
          />
        </View>
        <View style={styles.menuContainer}>
          {this.currentTab.component}
        </View>
      </View>
    )
  }

  get labels () {
    return this.state.tabs.map(tab => tab.label)
  }

  get currentTabIndex () {
    return this.state.tabs.indexOf(this.currentTab)
  }

  get currentTab () {
    return this.state.tabs.find((tab) => tab.id === this.props.uiReducer.menu.currentTab)
  }
}

MenuIOS.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  uiReducer: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return { uiReducer: state.uiReducer }
}

const intlMenuIOS = injectIntl(MenuIOS)
export default connect(mapStateToProps)(intlMenuIOS)
